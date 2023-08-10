import EventEmitter from 'events'
import { PriorityQueue } from './PriorityQueue'
import type { IPromiseQueueOptions } from './types/IPromiseQueueOptions'
import type { IQueue } from './types/IQueue'
import type { IQueueAddOptions } from './types/IQueueAddOptions'
import { PromiseQueueEvent } from './types/PromiseQueueEvent'
import { PromiseQueueTask } from './types/PromiseQueueTask'

/**
 * Promise queue with concurrency control.
 * ESM compatible port from https://www.npmjs.com/package/p-queue
 */
export class PromiseQueue<
  QueueType extends IQueue<() => Promise<unknown>, EnqueueOptionsType> = PriorityQueue,
  EnqueueOptionsType extends IQueueAddOptions = IQueueAddOptions,
> extends EventEmitter {
  //
  readonly _carryoverConcurrencyCount: boolean
  readonly _isIntervalIgnored: boolean
  _intervalCount = 0
  readonly _intervalCap: number
  readonly _interval: number
  _intervalEnd = 0
  _intervalId?: NodeJS.Timeout
  _timeoutId?: NodeJS.Timeout
  _queue: QueueType
  readonly _queueClass: new () => QueueType
  _pending = 0
  _concurrency!: number
  _isPaused: boolean

  /**
   * Creates a new `PromiseQueue` instance.
   */
  constructor(options?: IPromiseQueueOptions<QueueType, EnqueueOptionsType>) {
    super()
    options = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: PriorityQueue,
      ...options,
    } as IPromiseQueueOptions<QueueType, EnqueueOptionsType>

    if (!(typeof options.intervalCap === 'number' && options.intervalCap >= 1)) {
      throw new TypeError(
        `Expected 'intervalCap' to be a number from 1 and up, got '${
          options.intervalCap?.toString() ?? ''
        }' (${typeof options.intervalCap})`,
      )
    }

    if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(
        `Expected 'interval' to be a finite number >= 0, got '${
          options.interval?.toString() ?? ''
        }' (${typeof options.interval})`,
      )
    }

    this._carryoverConcurrencyCount = options.carryoverConcurrencyCount!
    this._isIntervalIgnored = options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0
    this._intervalCap = options.intervalCap
    this._interval = options.interval
    this._queue = new options.queueClass!()
    this._queueClass = options.queueClass!
    this.concurrency = options.concurrency!
    this._isPaused = options.autoStart === false
  }

  get _doesIntervalAllowAnother(): boolean {
    return this._isIntervalIgnored || this._intervalCount < this._intervalCap
  }

  get _doesConcurrentAllowAnother(): boolean {
    return this._pending < this._concurrency
  }

  _next(): void {
    this._pending--
    this._tryToStartAnother()
    this.emit('next')
  }

  _onResumeInterval(): void {
    this._onInterval()
    this._initializeIntervalIfNeeded()
    this._timeoutId = undefined
  }

  get _isIntervalPaused(): boolean {
    const now = Date.now()
    if (this._intervalId === undefined) {
      const delay = this._intervalEnd - now
      if (delay < 0) {
        // Act as the interval was done
        // We don't need to resume it here because it will be resumed on line 160
        this._intervalCount = this._carryoverConcurrencyCount ? this._pending : 0
      } else {
        // Act as the interval is pending
        if (this._timeoutId === undefined) {
          this._timeoutId = setTimeout(() => {
            this._onResumeInterval()
          }, delay)
        }
        return true
      }
    }
    return false
  }

  _tryToStartAnother(): boolean {
    if (this._queue.size === 0) {
      // We can clear the interval ("pause")
      // Because we can redo it later ("resume")
      if (this._intervalId) {
        clearInterval(this._intervalId)
      }
      this._intervalId = undefined
      this.emit('empty')
      if (this._pending === 0) {
        this.emit('idle')
      }
      return false
    }
    if (!this._isPaused) {
      const canInitializeInterval = !this._isIntervalPaused
      if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
        const job = this._queue.dequeue()
        if (!job) {
          return false
        }
        this.emit('active')
        job()
        if (canInitializeInterval) {
          this._initializeIntervalIfNeeded()
        }
        return true
      }
    }
    return false
  }

  _initializeIntervalIfNeeded(): void {
    if (this._isIntervalIgnored || this._intervalId !== undefined) {
      return
    }
    this._intervalId = setInterval(() => {
      this._onInterval()
    }, this._interval)
    this._intervalEnd = Date.now() + this._interval
  }

  _onInterval(): void {
    if (this._intervalCount === 0 && this._pending === 0 && this._intervalId) {
      clearInterval(this._intervalId)
      this._intervalId = undefined
    }
    this._intervalCount = this._carryoverConcurrencyCount ? this._pending : 0
    this._processQueue()
  }

  /**
   * Executes all queued functions until it reaches the limit.
   */
  _processQueue(): void {
    // eslint-disable-next-line no-empty
    while (this._tryToStartAnother()) {}
  }

  get concurrency(): number {
    return this._concurrency
  }

  set concurrency(newConcurrency: number) {
    if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
      throw new TypeError(
        `Expected 'concurrency' to be a number from 1 and up, got '${newConcurrency}' (${typeof newConcurrency})`,
      )
    }
    this._concurrency = newConcurrency
    this._processQueue()
  }

  async _throwOnAbort(signal: AbortSignal): Promise<never> {
    return new Promise((_resolve, reject) => {
      signal.addEventListener(
        'abort',
        () => {
          reject(new Error('The task was aborted.'))
        },
        { once: true },
      )
    })
  }

  /**
   * Adds a sync or async task to the queue. Always returns a promise.
   */
  async add<TaskResultType>(
    function_: PromiseQueueTask<TaskResultType>,
    options: Exclude<EnqueueOptionsType, 'throwOnTimeout'>,
  ): Promise<TaskResultType>
  async add<TaskResultType>(
    function_: PromiseQueueTask<TaskResultType>,
    options?: Partial<EnqueueOptionsType>,
  ): Promise<TaskResultType | void>
  async add<TaskResultType>(
    function_: PromiseQueueTask<TaskResultType>,
    options: Partial<EnqueueOptionsType> = {},
  ): Promise<TaskResultType | void> {
    options = { ...options }
    return new Promise((resolve, reject) => {
      this._queue.enqueue(async () => {
        this._pending++
        this._intervalCount++
        try {
          if (options.signal?.aborted) {
            throw new Error('The task was aborted.')
          }
          let operation = function_({ signal: options.signal })
          if (options.signal) {
            operation = Promise.race([operation, this._throwOnAbort(options.signal)])
          }
          const result = await operation
          resolve(result)
          this.emit('completed', result)
        } catch (error: unknown) {
          reject(error)
          this.emit('error', error)
        } finally {
          this._next()
        }
      }, options)
      this.emit('add')
      this._tryToStartAnother()
    })
  }

  /**
   * Same as `.add()`, but accepts an array of sync or async functions.
   * @returns A promise that resolves when all functions are resolved.
   */
  async addAll<TaskResultsType>(
    functions: ReadonlyArray<PromiseQueueTask<TaskResultsType>>,
    options?: Partial<Exclude<EnqueueOptionsType, 'throwOnTimeout'>>,
  ): Promise<TaskResultsType[]>
  async addAll<TaskResultsType>(
    functions: ReadonlyArray<PromiseQueueTask<TaskResultsType>>,
    options?: Partial<EnqueueOptionsType>,
  ): Promise<Array<TaskResultsType | void>>
  async addAll<TaskResultsType>(
    functions: ReadonlyArray<PromiseQueueTask<TaskResultsType>>,
    options?: Partial<EnqueueOptionsType>,
  ): Promise<Array<TaskResultsType | void>> {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)))
  }

  /**
   * Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
   */
  start(): this {
    if (!this._isPaused) {
      return this
    }
    this._isPaused = false
    this._processQueue()
    return this
  }

  /**
   * Put queue execution on hold.
   */
  pause(): void {
    this._isPaused = true
  }

  /**
   * Clear the queue.
   */
  clear(): void {
    this._queue = new this._queueClass()
  }

  /**
   * Can be called multiple times. Useful if you for example add additional items at a later time.
   * @returns A promise that settles when the queue becomes empty.
   */
  async onEmpty(): Promise<void> {
    // Instantly resolve if the queue is empty
    if (this._queue.size === 0) {
      return
    }
    await this._onEvent('empty')
  }

  /**
   * @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
   * If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
   * Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
   */
  async onSizeLessThan(limit: number): Promise<void> {
    // Instantly resolve if the queue is empty.
    if (this._queue.size < limit) {
      return
    }
    await this._onEvent('next', () => this._queue.size < limit)
  }

  /**
   * The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
   * @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
   */
  async onIdle(): Promise<void> {
    // Instantly resolve if none pending and if nothing else is queued
    if (this._pending === 0 && this._queue.size === 0) {
      return
    }
    await this._onEvent('idle')
  }

  async _onEvent(event: PromiseQueueEvent, filter?: () => boolean): Promise<void> {
    return new Promise((resolve) => {
      const listener = () => {
        if (filter && !filter()) {
          return
        }
        this.off(event, listener)
        resolve()
      }
      this.on(event, listener)
    })
  }

  /**
   * Size of the queue, the number of queued items waiting to run.
   */
  get size(): number {
    return this._queue.size
  }

  /**
   * Size of the queue, filtered by the given options.
   * For example, this can be used to find the number of items remaining in the queue with a specific priority level.
   */
  sizeBy(options: Readonly<Partial<EnqueueOptionsType>>): number {
    return this._queue.filter(options).length
  }

  /**
   * Number of running items (no longer in the queue).
   */
  get pending(): number {
    return this._pending
  }

  /**
   * Whether the queue is currently paused.
   */
  get isPaused(): boolean {
    return this._isPaused
  }
}

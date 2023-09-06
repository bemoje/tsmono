import { EventEmitter } from 'events'
import { PriorityQueue } from './PriorityQueue'
import type { IPromiseQueueOptions } from './types/IPromiseQueueOptions'
import type { IQueue } from './types/IQueue'
import type { IQueueAddOptions } from './types/IQueueAddOptions'
import { PromiseQueueEvent } from './types/PromiseQueueEvent'
import { PromiseQueueTask } from './types/PromiseQueueTask'

/**
 * Promise queue with concurrency control.
 * ESM compatible port from https://www.npmjs.com/package/p-queue
 * @template QueueType - The type of queue to use. Defaults to PriorityQueue.
 * @template EnqueueOptionsType - The type of options to use when adding items to the queue. Defaults to IQueueAddOptions.
 */
export class PromiseQueue<
  QueueType extends IQueue<() => Promise<unknown>, EnqueueOptionsType> = PriorityQueue,
  EnqueueOptionsType extends IQueueAddOptions = IQueueAddOptions
> extends EventEmitter {
  /**
   * Whether to carry over the concurrency count from the previous interval.
   */
  protected readonly _carryoverConcurrencyCount: boolean
  /**
   * Whether the interval is ignored.
   */
  protected readonly _isIntervalIgnored: boolean
  /**
   * The count of intervals that have occurred.
   */
  protected _intervalCount = 0
  /**
   * The maximum number of intervals allowed.
   */
  protected readonly _intervalCap: number
  /**
   * The interval duration in milliseconds.
   */
  protected readonly _interval: number
  /**
   * The end time of the current interval.
   */
  protected _intervalEnd = 0
  /**
   * The ID of the interval timer.
   */
  protected _intervalId?: NodeJS.Timeout
  /**
   * The ID of the timeout timer.
   */
  protected _timeoutId?: NodeJS.Timeout
  /**
   * The queue used to store tasks.
   */
  protected _queue: QueueType
  /**
   * The class of the queue.
   */
  protected readonly _queueClass: new () => QueueType
  /**
   * The number of pending tasks.
   */
  protected _pending = 0
  /**
   * The concurrency limit.
   */
  protected _concurrency!: number
  /**
   * Whether the queue is paused.
   */
  protected _isPaused: boolean

  /**
   * Creates a new `PromiseQueue` instance.
   * @param options - The options for the PromiseQueue.
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
        }' (${typeof options.intervalCap})`
      )
    }

    if (options.interval === undefined || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(
        `Expected 'interval' to be a finite number >= 0, got '${
          options.interval?.toString() ?? ''
        }' (${typeof options.interval})`
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._carryoverConcurrencyCount = options.carryoverConcurrencyCount!
    this._isIntervalIgnored = options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0
    this._intervalCap = options.intervalCap
    this._interval = options.interval
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._queue = new options.queueClass!()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._queueClass = options.queueClass!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.concurrency = options.concurrency!
    this._isPaused = options.autoStart === false
  }

  /**
   * The concurrency limit.
   * @public
   */
  get concurrency(): number {
    return this._concurrency
  }

  set concurrency(newConcurrency: number) {
    if (!(typeof newConcurrency === 'number' && newConcurrency >= 1)) {
      throw new TypeError(
        `Expected 'concurrency' to be a number from 1 and up, got '${newConcurrency}' (${typeof newConcurrency})`
      )
    }
    this._concurrency = newConcurrency
    this._processQueue()
  }

  /**
   * Adds a sync or async task to the queue. Always returns a promise.
   * @param function_ - The task function to add to the queue.
   * @param options - The options for adding the task to the queue.
   * @returns A promise that resolves with the result of the task function.
   */
  async add<TaskResultType>(
    function_: PromiseQueueTask<TaskResultType>,
    options: Exclude<EnqueueOptionsType, 'throwOnTimeout'>
  ): Promise<TaskResultType>
  async add<TaskResultType>(
    function_: PromiseQueueTask<TaskResultType>,
    options?: Partial<EnqueueOptionsType>
  ): Promise<TaskResultType | void>
  async add<TaskResultType>(
    function_: PromiseQueueTask<TaskResultType>,
    options: Partial<EnqueueOptionsType> = {}
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
   * @param functions - The array of task functions to add to the queue.
   * @param options - The options for adding the tasks to the queue.
   * @returns A promise that resolves when all task functions are resolved.
   */
  async addAll<TaskResultsType>(
    functions: ReadonlyArray<PromiseQueueTask<TaskResultsType>>,
    options?: Partial<Exclude<EnqueueOptionsType, 'throwOnTimeout'>>
  ): Promise<TaskResultsType[]>
  async addAll<TaskResultsType>(
    functions: ReadonlyArray<PromiseQueueTask<TaskResultsType>>,
    options?: Partial<EnqueueOptionsType>
  ): Promise<Array<TaskResultsType | void>>
  async addAll<TaskResultsType>(
    functions: ReadonlyArray<PromiseQueueTask<TaskResultsType>>,
    options?: Partial<EnqueueOptionsType>
  ): Promise<Array<TaskResultsType | void>> {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)))
  }

  /**
   * Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
   * @returns The PromiseQueue instance.
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
   * @param limit - The limit for the queue size.
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

  /**
   * Size of the queue, the number of queued items waiting to run.
   * @public
   */
  get size(): number {
    return this._queue.size
  }

  /**
   * Size of the queue, filtered by the given options.
   * For example, this can be used to find the number of items remaining in the queue with a specific priority level.
   * @param options - The options for filtering the queue.
   * @returns The size of the filtered queue.
   */
  sizeBy(options: Readonly<Partial<EnqueueOptionsType>>): number {
    return this._queue.filter(options).length
  }

  /**
   * Number of running items (no longer in the queue).
   * @public
   */
  get pending(): number {
    return this._pending
  }

  /**
   * Whether the queue is currently paused.
   * @public
   */
  get isPaused(): boolean {
    return this._isPaused
  }

  /**
   * Handles the 'abort' event on the signal and throws an error.
   * @param signal - The abort signal.
   * @returns A promise that never resolves.
   */
  protected async _throwOnAbort(signal: AbortSignal): Promise<never> {
    return new Promise((_resolve, reject) => {
      signal.addEventListener(
        'abort',
        () => {
          reject(new Error('The task was aborted.'))
        },
        { once: true }
      )
    })
  }

  /**
   * Checks if another interval is allowed.
   * @returns Whether another interval is allowed.
   */
  protected get _doesIntervalAllowAnother(): boolean {
    return this._isIntervalIgnored || this._intervalCount < this._intervalCap
  }

  /**
   * Checks if another concurrent task is allowed.
   * @returns Whether another concurrent task is allowed.
   */
  protected get _doesConcurrentAllowAnother(): boolean {
    return this._pending < this._concurrency
  }

  /**
   * Handles the next task in the queue.
   */
  protected _next(): void {
    this._pending--
    this._tryToStartAnother()
    this.emit('next')
  }

  /**
   * Resumes the interval and executes tasks if possible.
   */
  protected _onResumeInterval(): void {
    this._onInterval()
    this._initializeIntervalIfNeeded()
    this._timeoutId = undefined
  }

  /**
   * Checks if the interval is paused.
   * @returns Whether the interval is paused.
   */
  protected get _isIntervalPaused(): boolean {
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

  /**
   * Tries to start another task in the queue.
   * @returns Whether another task was started.
   */
  protected _tryToStartAnother(): boolean {
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

  /**
   * Initializes the interval if needed.
   */
  protected _initializeIntervalIfNeeded(): void {
    if (this._isIntervalIgnored || this._intervalId !== undefined) {
      return
    }
    this._intervalId = setInterval(() => {
      this._onInterval()
    }, this._interval)
    this._intervalEnd = Date.now() + this._interval
  }

  /**
   * Handles the interval event.
   */
  protected _onInterval(): void {
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
  protected _processQueue(): void {
    // eslint-disable-next-line no-empty
    while (this._tryToStartAnother()) {}
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
}

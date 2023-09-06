import { IQueue } from './IQueue'
import { IQueueAddOptions } from './IQueueAddOptions'
import { ITimeoutOptions } from './ITimeoutOptions'

export interface IPromiseQueueOptions<
  QueueType extends IQueue<() => Promise<unknown>, QueueOptions>,
  QueueOptions extends IQueueAddOptions,
> extends ITimeoutOptions {
  /**
   * Concurrency limit.
   * Minimum: `1`.
   * @default Infinity
   */
  readonly concurrency?: number

  /**
   * Whether queue tasks within concurrency limit, are auto-executed as soon as they're added.
   * @default true
   */
  readonly autoStart?: boolean

  /**
   * Class with a `enqueue` and `dequeue` method, and a `size` getter. See the [Custom QueueClass](https://github.com/sindresorhus/p-queue#custom-queueclass) section.
   */
  readonly queueClass?: new () => QueueType

  /**
   * The max number of runs in the given interval of time.
   * Minimum: `1`.
   * @default Infinity
   */
  readonly intervalCap?: number

  /**
   * The length of time in milliseconds before the interval count resets. Must be finite.
   *	Minimum: `0`.
   *	@default 0
   */
  readonly interval?: number

  /**
   * Whether the task must finish in the given interval or will be carried over into the next interval count.
   * @default false
   */
  readonly carryoverConcurrencyCount?: boolean
}

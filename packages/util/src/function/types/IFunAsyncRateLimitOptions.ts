/**
 * Options for @see funAsyncRateLimit
 */
export interface IFunAsyncRateLimitOptions {
  /**
   * Concurrency limit.
   * Minimum: `1`.
   * @default Infinity
   */
  concurrency?: number

  /**
   * Whether queue tasks within concurrency limit, are auto-executed as soon as they're added.
   * @default true
   */
  autoStart?: boolean

  /**
   * The max number of runs in the given interval of time.
   * Minimum: `1`.
   * @default Infinity
   */
  intervalCap?: number

  /**
   * The length of time in milliseconds before the interval count resets. Must be finite.
   *	Minimum: `0`.
   *	@default 0
   */
  interval?: number

  /**
   * Whether the task must finish in the given interval or will be carried over into the next interval count.
   * @default false
   */
  carryoverConcurrencyCount?: boolean

  /**
   * Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
   */
  timeout?: number

  /**
   * Whether or not a timeout is considered an exception.
   * @default false
   */
  throwOnTimeout?: boolean
}

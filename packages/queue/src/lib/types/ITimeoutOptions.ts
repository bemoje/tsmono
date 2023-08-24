export interface ITimeoutOptions {
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

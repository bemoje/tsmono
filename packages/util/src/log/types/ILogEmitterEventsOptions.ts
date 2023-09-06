export interface ILogEmitterEventsOptions {
  /**
   * The event names to log at debug level.
   */
  debug?: string[]

  /**
   * The event names to log at info level.
   */
  info?: string[]

  /**
   * The event names to log at warn level.
   */
  warn?: string[]

  /**
   * The event names to log at error level.
   */
  error?: string[]

  /**
   * For example a class name, so that emitted events are displayed as className.eventName.
   */
  eventNamePrefix?: string
}

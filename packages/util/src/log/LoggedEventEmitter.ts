import EventEmitter from 'eventemitter3'
import { XtError } from '../errors/XtError'
import { funSetName } from '../function/funSetName'
import { strFirstCharToUpperCase } from '../string/strFirstCharToUpperCase'
import { LogLevel } from './types/LogLevel'

/**
 * A wrapper around the native 'EventEmitter' class, intended for easy logging.
 *
 * @remarks
 * Allows for globally subscribing event listeners (loggers) to all events of all emitter instances all at once.
 *
 * It is only possible to emit a single argument besides the 'event' string|symbol.
 *  The 'blind' global listeners need emissions to conform to a known function signature.
 *
 * The single 'data' argument is wrapped in an Event or ErrorEvent object that also contains the event name,
 *  the emitted data argument and details about the event source. This means that when instantiating a LoggedEventListener,
 *  it is required to provide a type and name which is used in the event source identifier
 *
 * Events are emitted as instances of a per-emitter-instance-custom class that implements the @see ILoggedEvent interface.
 *
 * The 'captureRejections' option is set to true by default (relevant for async listeners).
 *  This can make it easier to handle errors in a consistent way when using Promises extensively.
 *  Normally, if an async listener throws an error and the listener itself does not catch it, the node process will crash
 *  with an 'unhandledException'. Instead, a Promise rejection is generated and emitted as an 'error' event.
 */
export class LoggedEventEmitter extends EventEmitter<string> {
  /**
   * Global default log levels for all events emitted by all emitters.
   */
  public static readonly logLevels: Record<string, LogLevel> = {
    debug: LogLevel.DEBUG,
    info: LogLevel.INFO,
    warn: LogLevel.WARN,
    error: LogLevel.ERROR,
  }

  /**
   * Set the global default log levels for a given event name.
   */
  public static setLogLevel(eventName: string, logLevel: LogLevel): void {
    if (logLevel === LogLevel.INFO) this.logLevels[eventName] = logLevel
  }

  /**
   * Global EventEmitter.
   */
  public static readonly GLOBAL_EVENTS = new EventEmitter<string>()

  /**
   * Custom constructor for events emitted by this LoggedEventEmitter instance.
   */
  private readonly EventClass: new (event: string, data?: unknown) => ILoggedEvent

  /**
   * Custom constructor for events emitted by this LoggedEventEmitter instance.
   */
  private readonly ErrorEventClass: new (error: Error) => ILoggedEvent

  /**
   * Create a new LoggedEventEmitter.
   * @param type - The name of the class/function/source of emitted events.
   * @param name - The name of the instance of the class/function/source of emitted events.
   */
  // constructor(type: string, name: string, options: { captureRejections?: boolean } = { captureRejections: true }) {
  constructor(public name: string = '') {
    super()
    this.EventClass = this.createEventClass()
    this.ErrorEventClass = this.createErrorEventClass()
  }

  /**
   * Synchronously calls each of the listeners registered for the given eventName, in the order they were registered, passing the supplied arguments to each.
   * @remarks Differes from the native EventEmitter emissions since only a single argument is accepted.
   * @param eventName - The event name to emit.
   * @param data - The data to emit with the event.
   * @returns Whether or not the event had listeners (not including global listeners).
   */
  public override emit<E extends string, T>(
    eventName: (E extends 'error' ? never : E) & ('error' extends E ? never : E),
    data?: T
  ): boolean {
    const e = new this.EventClass(eventName, data)
    const lvl = LoggedEventEmitter.logLevels[eventName] || (LoggedEventEmitter.logLevels[eventName] = LogLevel.INFO)
    LoggedEventEmitter.GLOBAL_EVENTS.emit(lvl, e)
    return super.emit(eventName, e)
  }

  /**
   * Synchronously calls each of the listeners registered for 'debug' events, in the order they were registered, passing the supplied arguments to each.
   * @remarks Differes from the native EventEmitter emissions since only a single argument is accepted.
   * @param data - The data to emit with the event.
   * @returns Whether or not the event had listeners (not including global listeners).
   */
  public emitDebug<T>(data?: T): boolean {
    const e = new this.EventClass('debug', data)
    LoggedEventEmitter.GLOBAL_EVENTS.emit(LogLevel.DEBUG, e)
    return super.emit('debug', e)
  }

  /**
   * Synchronously calls each of the listeners registered for 'info' events, in the order they were registered, passing the supplied arguments to each.
   * @remarks Differes from the native EventEmitter emissions since only a single argument is accepted.
   * @param data - The data to emit with the event.
   * @returns Whether or not the event had listeners (not including global listeners).
   */
  public emitInfo<T>(data?: T): boolean {
    const e = new this.EventClass('info', data)
    LoggedEventEmitter.GLOBAL_EVENTS.emit(LogLevel.INFO, e)
    return super.emit('info', e)
  }

  /**
   * Synchronously calls each of the listeners registered for 'warn' events, in the order they were registered, passing the supplied arguments to each.
   * @remarks Differes from the native EventEmitter emissions since only a single argument is accepted.
   * @param data - The data to emit with the event.
   * @returns Whether or not the event had listeners (not including global listeners).
   */
  public emitWarn<T>(data?: T): boolean {
    const e = new this.EventClass('warn', data)
    LoggedEventEmitter.GLOBAL_EVENTS.emit(LogLevel.WARN, e)
    return super.emit('warn', e)
  }

  /**
   * Synchronously calls each of the listeners registered for 'error' events, in the order they were registered, passing the supplied arguments to each.
   * @remarks Differes from the native EventEmitter emissions since only a single argument is accepted.
   * @param event - The event name to emit.
   * @param error - The error to emit with the event.
   * @returns Whether or not the event had listeners (not including global listeners).
   */
  public emitError(error: Error): boolean {
    const e = new this.ErrorEventClass(error)
    LoggedEventEmitter.GLOBAL_EVENTS.emit(LogLevel.ERROR, e)
    return super.emit('error', e)
  }

  /**
   * Helper method to create a custom event constructor for this specific emitter.
   */
  private createEventClass(): new (eventName: string, data?: unknown) => ILoggedEvent {
    const getParent = () => this
    return funSetName(
      this.getEventClassNamePrefix() + 'Event',
      class extends AbstractEvent {
        get parent(): LoggedEventEmitter {
          return getParent()
        }
        get type(): string {
          return getParent().type
        }
      }
    )
  }

  /**
   * Helper method to create a custom event constructor for this specific emitter.
   */
  private createErrorEventClass(): new (error: Error) => ILoggedEvent {
    const getParent = () => this
    return funSetName(
      this.getEventClassNamePrefix() + 'Error',
      class ErrorEvent extends AbstractErrorEvent {
        get parent(): LoggedEventEmitter {
          return getParent()
        }
        get type(): string {
          return getParent().type
        }
      }
    )
  }

  /**
   * Helper method to create an event type identifier string
   */
  private get type(): string {
    return this.constructor.name + (this.name ? '<' + this.name + '>' : '')
  }

  /**
   * Helper method to create a name prefix for the unique instance-specific Event and ErrorEvent classes.
   */
  private getEventClassNamePrefix() {
    return strFirstCharToUpperCase(this.constructor.name) + strFirstCharToUpperCase(this.name)
  }

  /**
   * Adds the listener function to the end of the listeners array for the event named eventName.
   * No checks are made to see if the listener has already been added.
   * Multiple calls passing the same combination of eventNameand listener will result in the listener being added, and called, multiple times.
   * @remarks Differes from the native EventEmitter listeners since only a single argument is accepted.
   * @param eventName - The event name to emit.
   * @param listener - The listener to add.
   */
  public override on(eventName: string, listener: TLoggedEventListener): this {
    return super.on(eventName, listener)
  }

  /**
   * Adds a one-timelistener function for the event named eventName.
   * The next time eventName is triggered, this listener is removed and then invoked.
   * @remarks Differes from the native EventEmitter listeners since only a single argument is accepted.
   * @param eventName - The event name to emit.
   * @param listener - The listener to add.
   */
  public override once(eventName: string, listener: TLoggedEventListener): this {
    return super.once(eventName, listener)
  }

  /**
   * @alias on - alias for the 'on' method.
   */
  public override addListener(eventName: string, listener: TLoggedEventListener): this {
    return super.addListener(eventName, listener)
  }
}

/**
 * Abstract base class for custom events emitted by a @see LoggedEventEmitter instance.
 */
export abstract class AbstractEvent implements ILoggedEvent {
  /**
   * Event name classifying this event.
   */
  public event: string

  /**
   * Optional data argument to emitted with the event.
   */
  public data?: unknown

  /**
   * @param event - The event name.
   * @param data - Optional data argument to emit with the event.
   */
  constructor(event: string, data?: unknown) {
    this.event = event
    this.data = data
  }

  /**
   * An object that uniquely identifies the event source (a specific emitter instance).
   */
  public abstract get parent(): LoggedEventEmitter

  /**
   * An event type identifier string
   */
  public abstract get type(): string

  /**
   * Called internally by JSON.stringify, so the returned object is what JSON.stringify serializes.
   */
  public toJSON() {
    return {
      event: this.event,
      type: this.type,
      data: this.data,
    }
  }

  /**
   * @returns true if this event is an instance of Error.
   */
  public get isError(): false {
    return false
  }
}

/**
 * Abstract base class for custom error events emitted by a @see LoggedEventEmitter instance.
 */
export abstract class AbstractErrorEvent extends XtError implements ILoggedEvent {
  /**
   * Event name or symbol classifying this event.
   */
  public get event(): string {
    return 'error'
  }

  /**
   * @param error - an Error instance, a string or other value that when converted to a string, describes the error.
   */
  constructor(error: string | Error) {
    super(error)
  }

  /**
   * An object that uniquely identifies the event source (a specific emitter instance).
   */
  public abstract get parent(): LoggedEventEmitter

  /**
   * An event type identifier string
   */
  public abstract get type(): string

  /**
   * Called internally by JSON.stringify, so the returned object is what JSON.stringify serializes.
   */
  public override toJSON() {
    return {
      event: 'error',
      type: this.type,
      ...super.toJSON(),
    }
  }

  /**
   * @returns true if this event is an instance of Error.
   */
  public get isError(): true {
    return true
  }
}

/**
 * An object that uniquely identifies an event source (a specific emitter instance).
 */
export interface IEventSource {
  type: string
  name: string
  get parent(): LoggedEventEmitter
}

/**
 * An event emitted by a @see LoggedEventEmitter instance.
 *
 * Emitted events, including error events implement this interface.
 * @see AbstractEvent
 * @see AbstractErrorEvent
 */
export interface ILoggedEvent {
  event: string
  get type(): string
  get parent(): LoggedEventEmitter
  data?: unknown
  toJSON(): Record<string, unknown> | unknown[]
  get isError(): boolean
}

/**
 * Function signature of event listeners of @see LoggedEventEmitter instances.
 */
export type TLoggedEventListener = (event: ILoggedEvent) => void | Promise<void>

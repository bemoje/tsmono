import EE from 'eventemitter3'

export class EventEmitterExtra<EventTypes extends EE.ValidEventTypes = string | symbol, Context = any> extends EE<
  EventTypes,
  Context
> {
  constructor(...args: ConstructorParameters<typeof EE>) {
    super(...args)
  }

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   */
  override eventNames(): Array<EE.EventNames<EventTypes>> {
    return super.eventNames()
  }

  /**
   * Return the listeners registered for a given event.
   */
  override listeners<T extends EE.EventNames<EventTypes>>(event: T): Array<EE.EventListener<EventTypes, T>> {
    return super.listeners(event)
  }

  /**
   * Return the number of listeners listening to a given event.
   */
  override listenerCount(event: EE.EventNames<EventTypes>): number {
    return super.listenerCount(event)
  }

  /**
   * Calls each of the listeners registered for a given event.
   */
  override emit<T extends EE.EventNames<EventTypes>>(event: T, ...args: EE.EventArgs<EventTypes, T>): boolean {
    return super.emit(event, ...args)
  }

  /**
   * Add a listener for a given event.
   */
  override on<T extends EE.EventNames<EventTypes>>(
    event: T,
    fn: EE.EventListener<EventTypes, T>,
    context?: Context
  ): this {
    return super.on(event, fn, context)
  }

  override addListener<T extends EE.EventNames<EventTypes>>(
    event: T,
    fn: EE.EventListener<EventTypes, T>,
    context?: Context
  ): this {
    return super.addListener(event, fn, context)
  }

  /**
   * Add a one-time listener for a given event.
   */
  override once<T extends EE.EventNames<EventTypes>>(
    event: T,
    fn: EE.EventListener<EventTypes, T>,
    context?: Context
  ): this {
    return super.once(event, fn, context)
  }

  /**
   * Remove the listeners of a given event.
   */
  override removeListener<T extends EE.EventNames<EventTypes>>(
    event: T,
    fn?: EE.EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean
  ): this {
    return super.removeListener(event, fn, context, once)
  }

  override off<T extends EE.EventNames<EventTypes>>(
    event: T,
    fn?: EE.EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean
  ): this {
    return super.off(event, fn, context, once)
  }

  /**
   * Remove all listeners, or those of the specified event.
   */
  override removeAllListeners(event?: EE.EventNames<EventTypes>): this {
    return super.removeAllListeners(event)
  }

  onAny<T extends EE.EventNames<EventTypes>>(eventNames: T[], listener: EE.EventListener<EventTypes, T>): this {
    for (const eventName of eventNames) {
      this.on(eventName, listener)
    }
    return this
  }

  onAll<T extends EE.EventNames<EventTypes>>(listener: EE.EventListener<EventTypes, T>): this {
    return this.onAny(this.eventNames() as T[], listener)
  }
}

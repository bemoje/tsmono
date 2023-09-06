import { EventEmitter } from 'events'

export class EventEmitterExtra extends EventEmitter {
  constructor(...args: ConstructorParameters<typeof EventEmitter>) {
    super(...args)
  }

  onAny(eventNames: (string | symbol)[], listener: (...args: unknown[]) => void): this {
    for (const eventName of eventNames) {
      this.on(eventName, listener)
    }
    return this
  }

  onAll(listener: (...args: unknown[]) => void): this {
    return this.onAny(this.eventNames(), listener)
  }
}

import { ExtensibleFunction, setNonEnumerable } from '@bemoje/util'
import { EventEmitter } from 'events'
import { FunctionCallEvent } from './FunctionCallEvent'
import { FunctionErrorEvent } from './FunctionErrorEvent'
import { FunctionReturnEvent } from './FunctionReturnEvent'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */

export class MonitoredFunction<F extends (...args: any[]) => any = (...args: any[]) => any> extends ExtensibleFunction {
  static readonly instances: MonitoredFunction[] = []
  protected static nextInstanceId = 0
  protected static nextCallId = 0

  readonly id: number
  enabled: boolean

  readonly events: EventEmitter
  readonly originalFunction: F

  /**
   * Creates a new instance
   * @param fun The function to wrap
   */
  constructor(fun: F) {
    let instance: MonitoredFunction<F> = MonitoredFunction.prototype
    const events = new EventEmitter()

    super(fun.name, function monitor(this: unknown, ...args: Parameters<F>): ReturnType<F> {
      if (!instance.enabled) {
        return fun.call(this, ...args)
      }
      const e: FunctionCallEvent<F> = {
        id: MonitoredFunction.nextCallId++,
        args,
      }
      events.emit('call', e)
      let retval
      const t0 = Date.now()
      if (events.listenerCount('error')) {
        try {
          retval = fun.call(this, ...args)
        } catch (err: unknown) {
          e.tte = Date.now() - t0
          e.error = err
          events.emit('error', e as FunctionErrorEvent<F>)
          throw err
        }
      } else {
        retval = fun.call(this, ...args)
      }
      e.tte = Date.now() - t0
      e.retval = retval
      events.emit('return', e as FunctionReturnEvent<F>)
      return retval
    })
    instance = this

    this.enabled = true
    this.id = MonitoredFunction.nextInstanceId++
    this.events = events
    this.originalFunction = fun
    setNonEnumerable(this, 'events', 'originalFunction', 'enabled')
    MonitoredFunction.instances[this.id] = this
  }
}

import { MonitoredFunction } from './MonitoredFunction'
import { monitorMethod } from './monitorMethod'
/* eslint-disable @typescript-eslint/no-explicit-any */

export function monitorPrototypeMethod<F extends (...args: any[]) => any>(
  Class: typeof Object.prototype.constructor,
  methodName: string
): MonitoredFunction<F> {
  return monitorMethod(Class.prototype, methodName)
}

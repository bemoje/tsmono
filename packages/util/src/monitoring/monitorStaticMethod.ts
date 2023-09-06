import { MonitoredFunction } from './MonitoredFunction'
import { monitorMethod } from './monitorMethod'

export function monitorStaticMethod<F extends (...args: any[]) => any>(
  Class: typeof Object.prototype.constructor,
  methodName: string
): MonitoredFunction<F> {
  return monitorMethod(Class, methodName)
}

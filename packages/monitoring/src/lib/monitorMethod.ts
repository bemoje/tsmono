import { MonitoredFunction } from './MonitoredFunction'

export function monitorMethod<O extends Record<string | number | symbol, any>, F extends (...args: any[]) => any>(
  object: O,
  methodName: string
): MonitoredFunction<F> {
  const method = object[methodName]
  if (!method) throw new Error('Method ' + methodName + ' is not defined on the object')
  const monitored = new MonitoredFunction<F>(method)
  Object.defineProperty(object, methodName, { value: monitored })
  return monitored
}

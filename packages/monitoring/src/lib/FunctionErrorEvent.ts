import { FunctionCallEvent } from './FunctionCallEvent'

export interface FunctionErrorEvent<F extends (...args: any[]) => any> extends FunctionCallEvent<F> {
  tte: number
  error: unknown
}

import { FunctionCallEvent } from './FunctionCallEvent'

export interface FunctionReturnEvent<F extends (...args: any[]) => any> extends FunctionCallEvent<F> {
  retval: ReturnType<F>
  tte: number
}

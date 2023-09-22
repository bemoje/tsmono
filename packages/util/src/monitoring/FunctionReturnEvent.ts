import { FunctionCallEvent } from './FunctionCallEvent'
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FunctionReturnEvent<F extends (...args: any[]) => any> extends FunctionCallEvent<F> {
  retval: ReturnType<F>
  tte: number
}

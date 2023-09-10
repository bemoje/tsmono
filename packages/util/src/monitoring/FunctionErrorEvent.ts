import { FunctionCallEvent } from './FunctionCallEvent'
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FunctionErrorEvent<F extends (...args: any[]) => any> extends FunctionCallEvent<F> {
  tte: number
  error: unknown
}

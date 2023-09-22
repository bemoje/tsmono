/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FunctionCallEvent<F extends (...args: any[]) => any> {
  id: number
  args: Parameters<F>
  retval?: ReturnType<F>
  tte?: number
  error?: unknown
}

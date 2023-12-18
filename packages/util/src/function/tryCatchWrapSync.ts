/* eslint-disable @typescript-eslint/no-explicit-any */
import { funSetName } from './funSetName'

/**
 * Wraps a synchronous function with error handling logic.
 *
 * @param func - The function to wrap.
 * @returns A new function that wraps the original function with error handling.
 */
export function tryCatchWrapSync<R, T extends (...args: any[]) => R>(func: T, onError?: (error: Error) => void) {
  return funSetName(func.name, function (this: unknown, ...args: Parameters<T>): R | void {
    try {
      return func.call(this || func, ...args)
    } catch (error) {
      if (onError && error instanceof Error) onError(error)
    }
  })
}

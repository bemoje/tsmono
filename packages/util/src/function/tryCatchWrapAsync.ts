/* eslint-disable @typescript-eslint/no-explicit-any */
import { funSetName } from './funSetName'
import { handlePromise } from './handlePromise'

/**
 * Wraps an asynchronous function, catches all sync and async errors and passes them to the onError callback instead of throwing.
 * All promises are resolved. If there was an error, they are resolved with 'undefined'.
 *
 * @param func - The function to wrap.
 * @returns A new function that wraps the original function with error handling.
 */
export function tryCatchWrapAsync<R, T extends (...args: any[]) => Promise<R | void>>(
  func: T,
  onError?: (error: Error) => void
) {
  return funSetName(func.name, async function (this: unknown, ...args: Parameters<T>): Promise<R | void> {
    try {
      const [error, retval] = await handlePromise(func.call(this || func, ...args))
      if (error && onError && error instanceof Error) onError(error)
      return retval as R
    } catch (error) {
      if (onError && error instanceof Error) onError(error)
    }
  })
}

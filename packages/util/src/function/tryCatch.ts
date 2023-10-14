import { handlePromise } from './handlePromise'

/**
 * Wraps and invokes a function and catches any errors that are thrown.
 * Promises are also handled.
 * @returns a tuple with the error and the result.
 *
 * @param fn - The function or promise to wrap.
 * @returns A promise that resolves to a tuple with the error and the result.
 * @template R - The type of the return value of the function or promise.
 */
export async function tryCatch<R>(fn: () => R | Promise<R>): Promise<[Error | undefined, R | undefined]> {
  try {
    const result = fn()
    if (result instanceof Promise) {
      return await handlePromise(result)
    }
    return [undefined, result]
  } catch (error) {
    if (error instanceof Error) return [error, undefined]
    return [new Error(error ? error.toString() : String(error)), undefined]
  }
}

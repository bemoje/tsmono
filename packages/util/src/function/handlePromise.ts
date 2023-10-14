/**
 * Handles a promise and returns a tuple with the error and the result.
 *
 * @param promise - The promise to handle.
 * @returns A promise that resolves to a tuple with the error and the result.
 * @template T - The type of the result of the promise.
 * @template E - The type of the error of the promise.
 */
export function handlePromise<T, E = unknown>(promise: Promise<unknown>): Promise<[E, T]> {
  const isThennable = promise && typeof promise === 'object' && Reflect.has(promise, 'then')
  const promised = isThennable ? promise : Promise.resolve(promise)
  return promised.then((data) => [undefined, data]).catch((error) => Promise.resolve(error)) as Promise<[E, T]>
}

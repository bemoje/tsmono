/**
 * Executes an array of asynchronous tasks in a serial manner, one after the other.
 * Returns a promise that resolves with an array of results of each task.
 * @template T - The type of the result of each task.
 * @param tasks An array of functions that return a promise.
 * @returns A promise that resolves with an array of results of each task.
 * @example ```ts
 * [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)].map(task => asyncTasksSerial(task));
 * //=> [1, 2, 3]
 * ```
 * @throws If any of the tasks fail, the function will throw an error.
 */
export async function asyncTasksSerial<T>(tasks: Array<() => Promise<T>>): Promise<Array<T>> {
  const results: Array<T> = []
  for (const task of tasks) {
    results.push(await task())
  }
  return results
}

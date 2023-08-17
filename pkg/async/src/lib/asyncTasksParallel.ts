/**
 * Executes an array of asynchronous tasks in parallel and returns an array of results.
 * @remarks This function is useful when you need to perform multiple asynchronous operations concurrently and wait for all of them to complete.
 * @typeparam T - The type of the result that each asynchronous task returns.
 * @param tasks An array of functions that return a Promise of type T.
 * @returns A Promise that resolves to an array of results of type T.
 * @example ```ts
 * [
 *   async () => await fetch('https://api.example.com/data1'),
 *   async () => await fetch('https://api.example.com/data2'),
 *   async () => await fetch('https://api.example.com/data3')
 * ].map(task => asyncTasksParallel(task));;
 * //=> {results}
 * ```
 */
export async function asyncTasksParallel<T>(tasks: Array<() => Promise<T>>): Promise<Array<T>> {
  return await Promise.all(tasks.map((task) => task()))
}

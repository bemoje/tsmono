/**
 * Executes an async task with a timeout.
 * @param timeout The timeout in milliseconds.
 * @param task The async task to execute.
 * @param args The arguments to pass to the task.
 * @template T The type of the value that the Promise resolves to.
 * @throws If the Promise does not resolve within the specified time, an Error is thrown with a message indicating the timeout.
 * @returns A promise that resolves with the task's result or rejects with an error.
 * @example ```ts
 * // Example 1: Resolving a promise within the timeout
 * asyncWithTimeout(5000, async () => {
 *   await new Promise((resolve) => setTimeout(resolve, 2000))
 *   return 'Task completed within timeout'
 * })
 *   .then((result) => console.log(result))
 *   .catch((error) => console.error(error))
 * // Example 2: Rejecting a promise due to timeout
 * asyncWithTimeout(2000, async () => {
 *   await new Promise((resolve) => setTimeout(resolve, 5000))
 *   return 'This should not be returned'
 * })
 *   .then((result) => console.log(result))
 *   .catch((error) => console.error(error))
 * ```
 */
export function asyncWithTimeout<T>(timeout: number, task: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Timed out after ${timeout} ms.`))
    }, timeout)
    task().then(
      (value: T) => {
        resolve(value)
      },
      (error: Error) => {
        reject(error)
      },
    )
  })
}

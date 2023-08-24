/**
 * This function waits for a specified number of seconds before resolving a promise.
 * @returns A promise that resolves after the specified number of seconds.
 */
export function waitSeconds(secs = 0): Promise<void> {
  return new Promise((resolve) => {
    if (secs < 0) throw new Error('secs must be a positive number')
    setTimeout(resolve, Math.floor(secs * 1000))
  })
}

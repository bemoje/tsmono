import { wait } from '../async/wait'
import { funAsyncRateLimit } from './funAsyncRateLimit'
import { funSetName } from './funSetName'

export function funAsyncAutoRateLimit<T>(
  concurrency: number,
  func: (...args: any[]) => Promise<T>
): (...args: any[]) => Promise<T> {
  let wasJustReduced = false
  const [queue, result] = funAsyncRateLimit(
    async function (...args: any[]): Promise<T> {
      try {
        return await func.call(queue, ...args)
      } catch (error) {
        if (!wasJustReduced) {
          wasJustReduced = true
          queue.concurrency = Math.max(1, Math.floor(queue.concurrency / 10))
          await wait(250)
          wasJustReduced = false
          const newValue = queue.concurrency * 9
          queue.concurrency = newValue
          if (newValue < concurrency / 10) {
            throw new Error('funAsyncAutoRateLimit: concurrency is below 10% of the original value.')
          }
        }
        return await result(...args)
      }
    },
    { concurrency }
  )
  return funSetName(result.name, result)
}

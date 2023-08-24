import type { IPromiseQueueOptions, IQueue, IQueueAddOptions } from '@bemoje/queue'
import { PromiseQueue } from '@bemoje/queue'
import { funSetName } from './funSetName'

/**
 * Function call rate limiter / concurrency control.
 * @param fun Function to be rate limited.
 * @param options Options for the rate limiter.
 * @example ```ts
 * const [queue, waitSecondsLimited] = funAsyncRateLimit(waitSeconds, {
 *   // Whether the task must finish in the given interval or will be carried over into the next interval count.
 *   carryoverConcurrencyCount: false,
 *   // max 50
 *   intervalCap: 50,
 *   // per minute
 *   interval: 1000 * 60,
 *   // max 3 concurrent
 *   concurrency: 3,
 *   // whether to start immediately when pushed to queue
 *   autoStart: true,
 *   priority: 0,
 *   timeout: 0,
 *   throwOnTimeout: false,
 * })
 *
 * queue.onEmpty().then(() => {
 *   console.log('Queue empty')
 * })
 *
 * for (let i = 0; i < 7; i++) {
 *   console.log({ i, inQueueBefore: queue.size })
 *   waitSecondsLimited(2).then((returnValue) => {
 *     console.log({ i, inQueueAfter: queue.size, returnValue })
 *   })
 * }
 * //=> { i: 0, inQueueBefore: 0 }
 * //=> { i: 1, inQueueBefore: 0 }
 * //=> { i: 2, inQueueBefore: 0 }
 * //=> { i: 3, inQueueBefore: 0 }
 * //=> { i: 4, inQueueBefore: 1 }
 * //=> { i: 5, inQueueBefore: 2 }
 * //=> { i: 6, inQueueBefore: 3 }
 * //=> Queue empty
 * //=> { i: 0, inQueueAfter: 3, returnValue: undefined }
 * //=> { i: 1, inQueueAfter: 2, returnValue: undefined }
 * //=> { i: 2, inQueueAfter: 1, returnValue: undefined }
 * //=> { i: 3, inQueueAfter: 0, returnValue: undefined }
 * //=> { i: 4, inQueueAfter: 0, returnValue: undefined }
 * //=> { i: 5, inQueueAfter: 0, returnValue: undefined }
 * //=> { i: 6, inQueueAfter: 0, returnValue: undefined }
 * ```
 */
export function funAsyncRateLimit<
  QueueType extends IQueue<() => Promise<unknown>, EnqueueOptionsType>,
  EnqueueOptionsType extends IQueueAddOptions,
>(
  fun: (...args: any[]) => any,
  options: IPromiseQueueOptions<QueueType, EnqueueOptionsType> = {},
): [PromiseQueue<QueueType, EnqueueOptionsType>, (...args: any[]) => Promise<any>] {
  const queue = new PromiseQueue(options)
  const wrapped = funSetName(fun.name, async function (...args: any[]) {
    return await queue.add(async () => {
      return await fun.call(queue, ...args)
    })
  })
  return [queue, wrapped]
}

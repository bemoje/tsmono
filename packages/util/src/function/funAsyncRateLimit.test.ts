import { funAsyncRateLimit } from './funAsyncRateLimit'

describe(funAsyncRateLimit.name, () => {
  it('should execute the provided function with rate limiting', async () => {
    const [queue, rateLimitedFun] = funAsyncRateLimit(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
        return 'done'
      },
      { concurrency: 2 }
    )
    const result = await rateLimitedFun()
    expect(result).toBe('done')
    expect(queue.pending).toBe(0)
  })

  it('should rate limit the function based on concurrency option', async () => {
    const [queue, rateLimitedFun] = funAsyncRateLimit(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      },
      { concurrency: 2 }
    )
    const promises: Promise<any>[] = []
    for (let i = 0; i < 5; i++) {
      promises.push(rateLimitedFun())
    }
    await Promise.all(promises)
    expect(queue.pending).toBe(0)
  })

  it('should rate limit the function based on interval option', async () => {
    const [queue, rateLimitedFun] = funAsyncRateLimit(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      },
      { interval: 500, intervalCap: 2 }
    )
    const start = Date.now()
    const promises: Promise<any>[] = []
    for (let i = 0; i < 10; i++) {
      promises.push(rateLimitedFun())
    }
    await Promise.all(promises)
    const end = Date.now()
    expect(end - start).toBeGreaterThan(1000)
    expect(queue.pending).toBe(0)
  })

  it('should call onSizeLessThan when the queue size becomes less than the given limit', async () => {
    const [queue, rateLimitedFun] = funAsyncRateLimit(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })
    const onSizeLessThanPromise = queue.onSizeLessThan(5)
    const promises: Promise<any>[] = []
    for (let i = 0; i < 10; i++) {
      promises.push(rateLimitedFun())
    }
    await expect(onSizeLessThanPromise).resolves.toBeUndefined()
  })
})

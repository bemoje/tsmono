import { asyncWithTimeout } from './asyncWithTimeout'

describe('asyncWithTimeout', () => {
  function wait(ms: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Waited ' + ms + 'ms')
      }, ms)
    })
  }

  it('timeouts when the function has not resolved before the given time in ms', async () => {
    await expect(
      asyncWithTimeout<string>(10, async () => {
        return await wait(20)
      }),
    ).rejects.toThrowError(`Timed out after ${10} ms.`)
  })

  it('does not timeout when the function resolves in time', async () => {
    await expect(
      asyncWithTimeout<string>(20, async () => {
        return await wait(10)
      }),
    ).resolves.toBe('Waited ' + 10 + 'ms')
  })

  it('should resolve with the task result if the task completes before the timeout', async () => {
    const task = jest.fn().mockResolvedValue('task result')
    const result = await asyncWithTimeout(1000, task)
    expect(result).toBe('task result')
    expect(task).toHaveBeenCalled()
  })

  it('should reject with the task error if the task fails before the timeout', async () => {
    const task = jest.fn().mockRejectedValue(new Error('task error'))
    await expect(asyncWithTimeout(1000, task)).rejects.toThrow('task error')
    expect(task).toHaveBeenCalled()
  })

  it('should reject with a timeout error if the task does not complete before the timeout', async () => {
    const task = jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 2000)))
    await expect(asyncWithTimeout(1000, task)).rejects.toThrow('Timed out after 1000 ms.')
    expect(task).toHaveBeenCalled()
  })
})

import { asyncTasksSerial } from './asyncTasksSerial'

describe('asyncTasksSerial', () => {
  it('should run async tasks serially', async () => {
    const tasks = [
      async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1)
          }, 200)
        })
      },
      async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(2)
          }, 100)
        })
      },
      async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(3)
          }, 10)
        })
      },
    ]
    const results = await asyncTasksSerial(tasks)
    expect(results).toEqual([1, 2, 3])
  })

  it('should return an array of results when all tasks are successful', async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)]
    const expectedResults = [1, 2, 3]
    const results = await asyncTasksSerial(tasks)
    expect(results).toEqual(expectedResults)
  })

  it('should execute tasks in a serial manner', async () => {
    let executionOrder = ''
    const tasks = [
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            executionOrder += '1'
            resolve(0)
          }, 300),
        ),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            executionOrder += '2'
            resolve(0)
          }, 200),
        ),
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            executionOrder += '3'
            resolve(0)
          }, 100),
        ),
    ]
    await asyncTasksSerial(tasks)
    expect(executionOrder).toBe('123')
  })

  it('should throw an error if any of the tasks fail', async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.reject(new Error('Task failed')), () => Promise.resolve(3)]
    await expect(asyncTasksSerial(tasks)).rejects.toThrow('Task failed')
  })

  it('should return an empty array when no tasks are provided', async () => {
    const tasks: any = []
    const results = await asyncTasksSerial(tasks)
    expect(results).toEqual([])
  })
})

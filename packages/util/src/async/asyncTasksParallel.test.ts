import { asyncTasksParallel } from './asyncTasksParallel'

describe('asyncTasksParallel', () => {
  it('should run async tasks in parallel', async () => {
    const resultsInOrder: number[] = []
    const tasks = [
      async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resultsInOrder.push(1)
            resolve(1)
          }, 200)
        })
      },
      async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resultsInOrder.push(2)
            resolve(2)
          }, 100)
        })
      },
      async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resultsInOrder.push(3)
            resolve(3)
          }, 10)
        })
      },
    ]
    const results = await asyncTasksParallel(tasks)
    expect(results).toEqual([1, 2, 3])
    expect(resultsInOrder).toEqual([3, 2, 1])
  })

  it('should return an array of results when given an array of tasks', async () => {
    const tasks = [async () => 'task1', async () => 'task2', async () => 'task3']
    const result = await asyncTasksParallel(tasks)
    expect(result).toEqual(['task1', 'task2', 'task3'])
  })

  it('should return an empty array when given an empty array of tasks', async () => {
    const tasks: Array<() => Promise<any>> = []
    const result = await asyncTasksParallel(tasks)
    expect(result).toEqual([])
  })

  it('should return an array of results in the same order as the tasks', async () => {
    const tasks = [
      async () => new Promise((resolve) => setTimeout(() => resolve('task1'), 300)),
      async () => new Promise((resolve) => setTimeout(() => resolve('task2'), 200)),
      async () => new Promise((resolve) => setTimeout(() => resolve('task3'), 100)),
    ]
    const result = await asyncTasksParallel(tasks)
    expect(result).toEqual(['task1', 'task2', 'task3'])
  })

  it('should throw an error if any of the tasks fail', async () => {
    const tasks = [
      async () => 'task1',
      async () => {
        throw new Error('task2 failed')
      },
      async () => 'task3',
    ]
    await expect(asyncTasksParallel(tasks)).rejects.toThrow('task2 failed')
  })
})

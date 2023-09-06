import { asyncTasksLimit } from './asyncTasksLimit'

describe('asyncTasksLimit', () => {
  it('should run all tasks if concurrency limit is greater than tasks length', async () => {
    const tasks = [async () => 'a', async () => 'b', async () => 'c', async () => 'd']
    const result = await asyncTasksLimit(5, tasks, undefined)
    expect(result).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should run tasks with concurrency limit', async () => {
    const tasks = [
      async () => new Promise((resolve) => setTimeout(() => resolve('a'), 10)),
      async () => new Promise((resolve) => setTimeout(() => resolve('b'), 10)),
      async () => new Promise((resolve) => setTimeout(() => resolve('c'), 10)),
      async () => new Promise((resolve) => setTimeout(() => resolve('d'), 10)),
    ]
    const result = await asyncTasksLimit(2, tasks, undefined)
    expect(result).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should execute callback for each resolved promise', async () => {
    const tasks = [
      async () => new Promise((resolve) => setTimeout(() => resolve('a'), 10)),
      async () => new Promise((resolve) => setTimeout(() => resolve('b'), 10)),
      async () => new Promise((resolve) => setTimeout(() => resolve('c'), 10)),
      async () => new Promise((resolve) => setTimeout(() => resolve('d'), 10)),
    ]
    const callback = jest.fn()
    const result = await asyncTasksLimit(2, tasks, callback)
    expect(callback).toHaveBeenCalledTimes(4)
    expect(callback).toHaveBeenCalledWith('a', 0)
    expect(callback).toHaveBeenCalledWith('b', 1)
    expect(callback).toHaveBeenCalledWith('c', 2)
    expect(callback).toHaveBeenCalledWith('d', 3)
    expect(result).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should preserve order of results', async () => {
    const tasks = [
      async () => new Promise((resolve) => setTimeout(() => resolve('a'), 10)),
      async () => new Promise((resolve) => setTimeout(() => resolve('b'), 20)),
      async () => new Promise((resolve) => setTimeout(() => resolve('c'), 5)),
      async () => new Promise((resolve) => setTimeout(() => resolve('d'), 15)),
    ]
    const result = await asyncTasksLimit(2, tasks, undefined)
    expect(result).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should run tasks in parallel with a limit', async () => {
    const tasks = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 200)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 300)),
    ]
    const result = await asyncTasksLimit(2, tasks)
    expect(result).toEqual([1, 2, 3])
  })

  it('should run tasks in order of completion', async () => {
    const tasks = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 200)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 300)),
    ]
    const result = await asyncTasksLimit(2, tasks)
    expect(result).toEqual([1, 2, 3])
  })

  it('should invoke callback in order of completion', async () => {
    const tasks = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 100)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 200)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 300)),
    ]
    const callback = jest.fn()
    await asyncTasksLimit(2, tasks, callback)
    expect(callback.mock.calls).toEqual([
      [1, 0],
      [2, 1],
      [3, 2],
    ])
  })
})

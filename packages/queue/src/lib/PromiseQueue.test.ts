import { PromiseQueue } from './PromiseQueue'

describe(PromiseQueue.name, () => {
  describe('constructor', () => {
    it('should create a PromiseQueue instance with default options', () => {
      const queue = new PromiseQueue()
      expect(queue.concurrency).toBe(Number.POSITIVE_INFINITY)
      expect(queue.isPaused).toBe(false)
    })

    it('should create a PromiseQueue instance with custom options', () => {
      const queue = new PromiseQueue({
        concurrency: 5,
        autoStart: false,
      })
      expect(queue.concurrency).toBe(5)
      expect(queue.isPaused).toBe(true)
    })
  })

  describe('add', () => {
    it('should add a task to the queue and execute it', async () => {
      const queue = new PromiseQueue()
      const task = jest.fn().mockResolvedValue('result')
      await queue.add(task)
      expect(task).toHaveBeenCalled()
    })

    it('should add a task to the queue with options and execute it', async () => {
      const queue = new PromiseQueue()
      const task = jest.fn().mockResolvedValue('result')
      const options = {
        priority: 1,
        timeout: 1000,
      }
      await queue.add(task, options)
      expect(task).toHaveBeenCalled()
    })

    it('should emit the "add" event when a task is added', async () => {
      const queue = new PromiseQueue()
      const task = jest.fn().mockResolvedValue('result')
      const addListener = jest.fn()
      queue.on('add', addListener)
      await queue.add(task)
      expect(addListener).toHaveBeenCalled()
    })

    it('should emit the "completed" event when a task is completed', async () => {
      const queue = new PromiseQueue()
      const task = jest.fn().mockResolvedValue('result')
      const completedListener = jest.fn()
      queue.on('completed', completedListener)
      await queue.add(task)
      expect(completedListener).toHaveBeenCalled()
    })
  })

  describe('addAll', () => {
    it('should add multiple tasks to the queue and execute them', async () => {
      const queue = new PromiseQueue()
      const task1 = jest.fn().mockResolvedValue('result1')
      const task2 = jest.fn().mockResolvedValue('result2')
      await queue.addAll([task1, task2])
      expect(task1).toHaveBeenCalled()
      expect(task2).toHaveBeenCalled()
    })

    it('should add multiple tasks to the queue with options and execute them', async () => {
      const queue = new PromiseQueue()
      const task1 = jest.fn().mockResolvedValue('result1')
      const task2 = jest.fn().mockResolvedValue('result2')
      const options = {
        priority: 1,
        timeout: 1000,
      }
      await queue.addAll([task1, task2], options)
      expect(task1).toHaveBeenCalled()
      expect(task2).toHaveBeenCalled()
    })

    it('should return an array of results when all tasks are completed', async () => {
      const queue = new PromiseQueue()
      const task1 = jest.fn().mockResolvedValue('result1')
      const task2 = jest.fn().mockResolvedValue('result2')
      const results = await queue.addAll([task1, task2])
      expect(results).toEqual(['result1', 'result2'])
    })
  })

  describe('onEmpty', () => {
    it('should resolve immediately if the queue is already empty', async () => {
      const queue = new PromiseQueue()
      await queue.onEmpty()
      expect(queue.size).toBe(0)
    })
  })

  describe('onSizeLessThan', () => {
    it('should resolve immediately if the queue size is already less than the given limit', async () => {
      const queue = new PromiseQueue()
      await queue.onSizeLessThan(2)
      expect(queue.size).toBe(0)
    })
  })

  describe('onIdle', () => {
    it('should resolve when the queue becomes idle', async () => {
      const queue = new PromiseQueue()
      const task = jest.fn()
      queue.add(task)
      expect(queue.pending).toBe(1)
      await queue.onIdle()
      expect(queue.pending).toBe(0)
    })

    it('should resolve immediately if the queue is already idle', async () => {
      const queue = new PromiseQueue()
      await queue.onIdle()
      expect(queue.pending).toBe(0)
    })
  })

  describe('pending', () => {
    it('should return the number of running items', () => {
      const queue = new PromiseQueue()
      const task = jest.fn()
      queue.add(task)
      expect(queue.pending).toBe(1)
    })
  })

  describe('isPaused', () => {
    it('should return true if the queue is paused', async () => {
      const queue = new PromiseQueue({ autoStart: false })
      expect(queue.isPaused).toBe(true)
    })

    it('should return false if the queue is not paused', async () => {
      const queue = new PromiseQueue()
      expect(queue.isPaused).toBe(false)
    })
  })
})

import { PriorityQueue } from './PriorityQueue'

describe(PriorityQueue.name, () => {
  describe('constructor', () => {
    it('should create an empty priority queue', () => {
      const queue = new PriorityQueue()
      expect(queue.size).toBe(0)
    })
  })

  describe('size', () => {
    it('should return the number of functions in the queue', () => {
      const queue = new PriorityQueue()
      queue.enqueue(async () => {})
      queue.enqueue(async () => {})
      expect(queue.size).toBe(2)
    })
  })

  describe('enqueue', () => {
    it('should add a function to the queue', () => {
      const queue = new PriorityQueue()
      const runFunction = async () => {}
      queue.enqueue(runFunction)
      expect(queue.size).toBe(1)
    })

    it('should add a function with the specified priority', () => {
      const queue = new PriorityQueue()
      const runFunction = async () => {}
      queue.enqueue(runFunction, { priority: 2 })
      queue.enqueue(runFunction, { priority: 1 })
      expect(queue.size).toBe(2)
      expect(queue.filter({ priority: 2 })).toContain(runFunction)
      expect(queue.filter({ priority: 1 })).toContain(runFunction)
    })

    it('should add a function with the default priority if not specified', () => {
      const queue = new PriorityQueue()
      const runFunction = async () => {}
      queue.enqueue(runFunction)
      expect(queue.size).toBe(1)
      expect(queue.filter({ priority: 0 })).toContain(runFunction)
    })
  })

  describe('dequeue', () => {
    it('should remove and return the first function in the queue', () => {
      const queue = new PriorityQueue()
      const runFunction1 = async () => {}
      const runFunction2 = async () => {}
      queue.enqueue(runFunction1)
      queue.enqueue(runFunction2)
      const dequeuedFunction = queue.dequeue()
      expect(dequeuedFunction).toBe(runFunction1)
      expect(queue.size).toBe(1)
    })

    it('should return undefined if the queue is empty', () => {
      const queue = new PriorityQueue()
      const dequeuedFunction = queue.dequeue()
      expect(dequeuedFunction).toBeUndefined()
    })
  })

  describe('filter', () => {
    it('should return an array of functions with the specified priority', () => {
      const queue = new PriorityQueue()
      const runFunction1 = async () => {}
      const runFunction2 = async () => {}
      const runFunction3 = async () => {}
      queue.enqueue(runFunction1, { priority: 1 })
      queue.enqueue(runFunction2, { priority: 2 })
      queue.enqueue(runFunction3, { priority: 1 })
      const filteredFunctions = queue.filter({ priority: 1 })
      expect(filteredFunctions).toContain(runFunction1)
      expect(filteredFunctions).toContain(runFunction3)
      expect(filteredFunctions).not.toContain(runFunction2)
    })

    it('should return an empty array if no functions have the specified priority', () => {
      const queue = new PriorityQueue()
      const runFunction = async () => {}
      queue.enqueue(runFunction, { priority: 1 })
      const filteredFunctions = queue.filter({ priority: 2 })
      expect(filteredFunctions).toEqual([])
    })
  })
})

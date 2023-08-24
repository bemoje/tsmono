import { Queue } from './Queue'

describe('Queue', () => {
  describe('enqueue', () => {
    it('should add an item to the queue', () => {
      const q = new Queue<number>()
      q.enqueue(1)
      expect(q.size).toBe(1)
    })
  })

  describe('dequeue', () => {
    it('should remove and return the first item in the queue', () => {
      const q = new Queue<number>()
      q.enqueue(1)
      q.enqueue(2)
      expect(q.dequeue()).toBe(1)
      expect(q.size).toBe(1)
    })

    it('should throw an error if the queue is empty', () => {
      const q = new Queue<number>()
      expect(() => q.dequeue()).toThrow('Queue is empty')
    })
  })

  describe('size', () => {
    it('should return the number of items in the queue', () => {
      const q = new Queue<number>()
      q.enqueue(1)
      q.enqueue(2)
      expect(q.size).toBe(2)
    })
  })

  describe('toArray', () => {
    it('should return a copy of the queue as an array', () => {
      const q = new Queue<number>()
      q.enqueue(1)
      q.enqueue(2)
      expect(q.toArray()).toEqual([1, 2])
    })
  })

  describe('from', () => {
    it('should create a new queue from an iterable', () => {
      const q = Queue.from([1, 2])
      expect(q.toArray()).toEqual([1, 2])
    })
  })

  describe('fromJSON', () => {
    it('should create a new queue from a JSON string', () => {
      const q = new Queue<number>()
      q.enqueue(1)
      const str = JSON.stringify(q)
      const q2 = Queue.fromJSON(str)
      expect(q2.toArray()).toEqual([1])
    })
  })

  describe('Symbol.iterator', () => {
    it('should allow the queue to be iterated over with a for...of loop', () => {
      const q = new Queue<number>()
      q.enqueue(1)
      q.enqueue(2)
      const arr: number[] = []
      for (const item of q) {
        arr.push(item)
      }
      expect(arr).toEqual([1, 2])
    })
  })
})

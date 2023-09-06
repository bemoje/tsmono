/**
 * A generic Queue class.
 * @template T The type of elements in the queue.
 */
export class Queue<T> {
  /**
   * The array to hold the queue's elements.
   */
  protected queue: Array<T> = []

  /**
   * Creates a new Queue instance from an iterable.
   * @template T The type of elements in the iterable.
   * @param o The iterable to create the queue from.
   * @returns A new Queue instance.
   */
  static from<T>(o: Iterable<T>): Queue<T> {
    const instance: Queue<T> = new Queue()
    instance.queue = [...o]
    return instance
  }

  /**
   * Creates a new Queue instance from a JSON string.
   * @template T The type of elements in the JSON string.
   * @param json The JSON string to create the queue from.
   * @returns A new Queue instance.
   */
  static fromJSON<T>(json: string): Queue<T> {
    return Queue.from(JSON.parse(json))
  }

  /**
   * Adds an item to the end of the queue.
   * @param item The item to add to the queue.
   * @returns The Queue instance.
   */
  public enqueue(item: T): Queue<T> {
    this.queue.push(item)
    return this
  }

  /**
   * Removes an item from the start of the queue.
   * @throws {Error} If the queue is empty.
   * @returns The removed item.
   */
  public dequeue(): T {
    const item = this.queue.shift()
    if (!item) throw new Error('Queue is empty')
    return item
  }

  /**
   * Gets the size of the queue.
   * @returns The size of the queue.
   */
  public get size(): number {
    return this.queue.length
  }

  /**
   * Converts the queue to an array.
   * @returns An array containing the queue's elements.
   */
  public toArray(): Array<T> {
    return this.queue.slice()
  }

  /**
   * Converts the queue to a JSON string.
   * @returns A JSON string representing the queue.
   */
  toJSON(): Array<T> {
    return this.queue
  }

  /**
   * Creates an iterator for the queue.
   * @yields The next element in the queue.
   */
  *[Symbol.iterator](): Iterator<T> {
    yield* this.queue
  }
}

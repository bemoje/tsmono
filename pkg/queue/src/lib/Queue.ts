export class Queue<T> {
  protected queue: Array<T> = []

  static from<T>(o: Iterable<T>): Queue<T> {
    const instance: Queue<T> = new Queue()
    instance.queue = [...o]
    return instance
  }

  static fromJSON<T>(json: string): Queue<T> {
    return Queue.from(JSON.parse(json))
  }

  public enqueue(item: T): Queue<T> {
    this.queue.push(item)
    return this
  }

  public dequeue(): T {
    const item = this.queue.shift()
    if (!item) throw new Error('Queue is empty')
    return item
  }

  public get size(): number {
    return this.queue.length
  }

  public toArray(): Array<T> {
    return this.queue.slice()
  }

  toJSON(): Array<T> {
    return this.queue
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this.queue
  }
}

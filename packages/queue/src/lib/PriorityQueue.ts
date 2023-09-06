/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { arrSortedInsertionIndex } from '@bemoje/util'
import { IPriorityQueueOptions } from './types/IPriorityQueueOptions'
import { IQueue } from './types/IQueue'

/**
 * A class representing a priority queue for async functions.
 */
export class PriorityQueue implements IQueue<() => Promise<unknown>, IPriorityQueueOptions> {
  /**
   * Queue of functions to run
   */
  protected readonly queue: Array<IPriorityQueueOptions & { run: () => Promise<unknown> }> = []

  /**
   * Get the number of functions in the queue
   */
  get size(): number {
    return this.queue.length
  }

  /**
   * Add a function to the queue
   * @param run Function to run
   * @param options Options for the queue
   */
  enqueue(run: () => Promise<unknown>, options?: Partial<IPriorityQueueOptions>): void {
    options = {
      priority: 0,
      ...options,
    }
    const element = {
      priority: options.priority,
      run,
    }
    if (this.size && this.queue[this.size - 1]!.priority! >= options.priority!) {
      this.queue.push(element)
      return
    }
    const index = arrSortedInsertionIndex(
      this.queue,
      element,
      (a: Readonly<IPriorityQueueOptions>, b: Readonly<IPriorityQueueOptions>) => b.priority! - a.priority!
    )
    this.queue.splice(index, 0, element)
  }

  /**
   * Remove a function from the queue
   */
  dequeue(): (() => Promise<unknown>) | undefined {
    const item = this.queue.shift()
    return item?.run
  }

  /**
   * Get the functions with the given priority.
   * @param options Options for the queue
   */
  filter(options: Readonly<Partial<IPriorityQueueOptions>>): (() => Promise<unknown>)[] {
    return this.queue
      .filter((element: Readonly<IPriorityQueueOptions>) => element.priority === options.priority)
      .map((element: Readonly<{ run: () => Promise<unknown> }>) => element.run)
  }
}

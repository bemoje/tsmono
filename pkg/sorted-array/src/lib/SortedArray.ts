import { ISortedArrayOptions } from './ISortedArrayOptions'

export class SortedArray<T> extends Array {
  private compare: (a: any, b: any) => number = (a: string, b: string): number => a.localeCompare(b)
  private allowDuplicates = true

  constructor(options: ISortedArrayOptions<T> = {}) {
    super()
    Object.defineProperties(this, {
      compare: { enumerable: false },
      allowDuplicates: { enumerable: false },
    })

    if (options.compare) {
      this.compare = options.compare
    }
    if (options.allowDuplicates === false) {
      this.allowDuplicates = false
    }
    if (options.data) {
      const data = this.allowDuplicates ? options.data : new Set(options.data)
      for (const element of data) {
        super.push(element)
      }
      if (!options.compare && typeof this[0] === 'number') {
        this.compare = (a: number, b: number): number => a - b
      }
      this.sort(this.compare)
    }
  }

  /**
   * Convert to a normal Array instance
   */
  public toArray(): T[] {
    return Array.from(this)
  }

  /**
   * Add an element to the sorted array.
   * @param element - The element to add.
   */
  public add(element: T): SortedArray<T> {
    if (this.length === 0) {
      super.push(element)
      return this
    }
    const [index, foundIdentical] = this.insertionIndex(element)
    if (foundIdentical && !this.allowDuplicates) return this
    super.splice(index, 0, element)
    return this
  }

  /**
   * Add elements to the sorted array.
   * @param elements - The elements to add.
   */
  public addMany(...elements: T[]): SortedArray<T> {
    if (elements.length === 0) return this
    for (const e of elements) {
      this.add(e)
    }
    return this
  }

  /**
   * Remove all duplicate elements in the sorted array, leaving only unique values. Equality is determined by the compare function.
   */
  public unique(): SortedArray<T> {
    let len = this.length
    if (len <= 1) return this
    for (let prev, curr, i = 1; i < len; i++) {
      prev = this[i - 1]
      curr = this[i]
      if (this.compare(prev, curr) === 0) {
        super.splice(i, 1)
        len--
        i--
      }
    }
    return this
  }

  /**
   * Returns a tuple containing the index of where to add an element to keep the array sorted and also whether an identical element was found.
   * @param element - The element for which to find its insertion index
   */
  public insertionIndex(element: T): [number, boolean] {
    if (this.length === 0) return [0, false]
    let low = 0
    let high = this.length
    while (low < high) {
      const mid = (low + high) >>> 1
      const order = this.compare(this[mid], element)
      if (order === 0) return [mid, true]
      if (order < 0) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    return [low, false]
  }

  /**
   * Returns a tuple containing the first index of where to add an element to keep the array sorted and also whether an identical element was found.
   * @param element - The element for which to find its insertion index
   */
  public firstInsertionIndex(element: T): [number, boolean] {
    const [index, foundIdentical] = this.insertionIndex(element)
    if (!foundIdentical) return [index, foundIdentical]
    let i = index - 1
    while (i >= 0) {
      if (this.compare(this[i], element) !== 0) {
        return [i + 1, foundIdentical]
      }
      i--
    }
    return [0, foundIdentical]
  }

  /**
   * Returns a tuple containing the last index of where to add an element to keep the array sorted and also whether an identical element was found.
   * @param element - The element for which to find its insertion index
   */
  public lastInsertionIndex(element: T): [number, boolean] {
    const [index, foundIdentical] = this.insertionIndex(element)
    if (!foundIdentical) return [index, foundIdentical]
    let i = index + 1
    while (i < this.length) {
      if (this.compare(this[i], element) !== 0) {
        return [i, foundIdentical]
      }
      i++
    }
    return [this.length, foundIdentical]
  }

  /**
   * Returns the index of the first element found that is determined equal by the compare function.
   * @param element - The element to find
   */
  public indexOfCompare(element: T): number {
    if (this.length === 0) return -1
    if (this.length === 1) return this.compare(this[0], element) === 0 ? 0 : -1
    const [index, foundIdentical] = this.insertionIndex(element)
    return foundIdentical ? index : -1
  }

  /**
   * Returns the index of the first element that is determined equal by the compare function.
   * @param element - The element to find
   */
  public firstIndexOfCompare(element: T): number {
    if (this.length === 0) return -1
    if (this.length === 1) return this.compare(this[0], element) === 0 ? 0 : -1
    const [index, foundIdentical] = this.firstInsertionIndex(element)
    return foundIdentical ? index : -1
  }

  /**
   * Returns the index of the last element that is determined equal by the compare function.
   * @param element - The element to find
   */
  public lastIndexOfCompare(element: T): number {
    if (this.length === 0) return -1
    if (this.length === 1) return this.compare(this[0], element) === 0 ? 0 : -1
    const [index, foundIdentical] = this.lastInsertionIndex(element)
    return foundIdentical ? index - 1 : -1
  }

  /**
   * Returns all indices at which element exists. Equality is determined by the compare function.
   * @param element - The element to find
   */
  public indicesOfCompare(element: T): number[] {
    const index = this.indexOfCompare(element)
    if (index === -1) return []
    const result: number[] = []
    if (!this.allowDuplicates) return result
    let i = index - 1
    while (i >= 0) {
      if (this.compare(this[i], element) === 0) {
        result.push(i)
      } else {
        break
      }
      i--
    }
    result.push(index)
    i = index + 1
    while (i < this.length) {
      if (this.compare(this[i], element) === 0) {
        result.push(i)
      } else {
        break
      }
      i++
    }
    result.sort((a: number, b: number): number => a - b)
    return result
  }

  /**
   * Returns the interestion of this and another sorted array.
   * @param sorted - another sorted array with which to find intersections
   */
  public intersection(sorted: T[]): T[] {
    const result = []
    let i1 = 0
    let i2 = 0
    // if a1 curr < a2 curr, loop a1 elems until a1 curr >= a2 curr
    while (i1 < this.length && i2 < sorted.length) {
      if (this.compare(this[i1], sorted[i2]) < 0) {
        i1++
      } else if (this.compare(this[i1], sorted[i2]) === 0) {
        result.push(this[i1])
        i1++
        i2++
      } else {
        i2++
      }
    }
    return result
  }

  /**
   * Pushes and sorts an element into the array.
   */
  override push(...elements: T[]): number {
    this.addMany(...elements)
    return this.length
  }

  /**
   * Throws an error since it would break the sorted state.
   */
  override reverse(): never {
    throw new Error('Cannot reverse a SortedArray since it would then no longer be sorted.')
  }

  /**
   * Same as Array.prototype.splice, but cannot insert elements
   */
  override splice(start: number, deleteCount?: number): SortedArray<T> {
    return super.splice(start, deleteCount) as SortedArray<T>
  }
}

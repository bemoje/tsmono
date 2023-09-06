export interface ISortedArrayOptions<T> {
  compare?: (a: T, b: T) => number
  data?: Iterable<T>
  allowDuplicates?: boolean
}

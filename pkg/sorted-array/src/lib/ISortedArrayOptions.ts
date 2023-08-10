export interface ISortedArrayOptions<T> {
  compare?: (a: any, b: any) => number
  data?: Iterable<T>
  allowDuplicates?: boolean
}

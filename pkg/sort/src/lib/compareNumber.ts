/**
 * Number comparator function (ascending)
 * @remarks This function subtracts the second number from the first number and returns the result.
 * @param a first value to compare
 * @param b second value to compare
 * @returns The difference between the two numbers
 * @example ```ts
 * const arr = [3, 1, 4, 1, 5]
 * arr.sort(compareNumber) // [1, 1, 3, 4, 5]
 * ```
 */
export function compareNumber(a: number, b: number): number {
  return a - b
}

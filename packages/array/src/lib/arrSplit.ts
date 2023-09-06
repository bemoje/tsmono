import { assertion, isPositiveInteger } from '@bemoje/util'

export function arrSplit<T>(array: T[], n: number): T[][] {
  assertion(n, isPositiveInteger)
  const result: T[][] = []
  if (array.length === 0) return result
  if (n === 1) return [array]
  const chunkSize = Math.ceil(array.length / n)
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}

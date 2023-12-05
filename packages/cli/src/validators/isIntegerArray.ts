import { isInteger } from './isInteger'

/**
 * Determine whether the input is an integer array.
 */
export function isIntegerArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((v) => isInteger(v))
}

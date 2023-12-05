import { isNumber } from './isNumber'

/**
 * Determine whether the input is a number array.
 */
export function isNumberArray(value: unknown): value is number[] {
  return Array.isArray(value) && value.every((v) => isNumber(v))
}

import { isString } from './isString'

/**
 * Determine whether the input is a string array.
 */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => isString(v))
}

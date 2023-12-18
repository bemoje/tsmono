import { TChar } from '../types/TChar'

/**
 * Determines whether a character is a string is a character between 0 and 9.
 */
export function isChar<T extends string>(string: T): string is TChar<T> {
  return string.length === 1
}

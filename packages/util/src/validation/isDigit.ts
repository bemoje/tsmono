import { TChar } from '../types/TChar'
import { TDigitGeneric } from '../types/TDigit'

/**
 * Returns true if the given character is a digit between 0 and 9.
 */
export function isDigit<T extends string>(string: TChar<T>): string is TDigitGeneric<T> {
  return /^[0-9]$/.test(string)
}

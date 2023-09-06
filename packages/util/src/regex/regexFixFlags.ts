import { strRemoveDuplicateChars } from '../string/strRemoveDuplicateChars'
import { strSortChars } from '../string/strSortChars'

/**
 * Takes a string of RegExp flags and returns a string guaranteed to be valid.
 * @returns The processed string of regex flags.
 * @remarks This function does not validate if the input string is a valid regex flags string. It only removes duplicates and non-regex characters.
 * @throws This function does not throw any exceptions.
 * @see strSortChars, strRemoveDuplicateChars
 * @param flags string of RegExp flags
 * @example ```ts
 * regexFixFlags('ggim') // 'gim'
 * regexFixFlags('?gim*') // 'gim'
 * ```
 */
export function regexFixFlags(flags: string): string {
  if (!flags) return flags
  return strSortChars(strRemoveDuplicateChars(flags).replace(/[^gimsuy]/gi, ''))
}

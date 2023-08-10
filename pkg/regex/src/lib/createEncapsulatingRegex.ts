import { strRemoveDuplicateChars } from '@bemoje/string'
import { regexEscapeString } from './regexEscapeString'

/**
 * Builds a regex that matches a string between two provided strings. Supports regex as boundaries as well.
 * @param left string or regex to match before
 * @param flags regex flags - 'g' and 's' are always added to whatever flags are passed.
 * @remarks The function accepts either strings or regular expressions as the left and right patterns.
 * If a string is provided, it will be escaped to form a valid regular expression.
 * The function also accepts an optional flags parameter to specify regular expression flags.
 * @returns A regular expression that matches text between the left and right patterns.
 * @example ```ts
 * const regex = createEncapsulatingRegex(/a/, /b/)
 * 'abc'.match(regex)?.groups?.mid // 'c'
 * ```
 */
export function createEncapsulatingRegex(left: string | RegExp, right: string | RegExp, flags?: string): RegExp {
  left = typeof left === 'string' ? regexEscapeString(left) : left.source
  right = typeof right === 'string' ? regexEscapeString(right) : right.source
  flags = flags ? strRemoveDuplicateChars('gs' + flags) : 'gs'
  return new RegExp(`(?<left>${left})(?<mid>.*?)(?=${right})(?<right>${right})`, flags)
}

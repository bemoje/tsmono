import { rexec } from './rexec'
import type { RexecYield } from './types/RexecYield'

/**
 * Returns the first match of a regular expression in a string.
 * @remarks This function is a part of RegExp utilities.
 * @param regex The regular expression to be used for matching.
 * @param string The string in which to search for a match.
 * @returns The first match as an `RexecYield` object, or `undefined` if no match is found.
 * @example ```ts
 * rexecFirstMatch(/hello/g, 'hello world');;
 * //=> { match: 'hello', index: 0, input: 'hello world', groups: undefined }
 * ```
 */
export function rexecFirstMatch(regex: RegExp, string: string): RexecYield | undefined {
  for (const item of rexec(new RegExp(regex.source, regex.flags), string)) return item
}

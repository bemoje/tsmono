import { regexEscapeString } from '@bemoje/node-util'

/**
 * Removes the specified left and right substrings from the input string.
 * @param input The input string from which to remove the substrings.
 * @param left The left substring to remove.
 * @param right The right substring to remove.
 * @param flags The flags for the RegExp. Default is an empty string.
 * @example ```ts
 * const input = 'Hello World';
 * const left = 'Hello ';
 * const right = ' World';
 * strUnwrap(input, left, right);
 * //=> 'World'
 * ```
 */
export function strUnwrap(input: string, left: string, right: string, flags = ''): string {
  return input
    .replace(new RegExp('^' + regexEscapeString(left), flags), '')
    .replace(new RegExp(regexEscapeString(right) + '$', flags), '')
}

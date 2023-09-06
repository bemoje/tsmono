/**
 * Escapes special characters in a string to be used in a regular expression.
 * @param str The input string to escape.
 * @returns The escaped string.
 * @example ```ts
 * const input = 'Hello, world!';
 * regexEscapeString(input);;
 * //=> 'Hello, world!'
 * ```
 */
export function regexEscapeString(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

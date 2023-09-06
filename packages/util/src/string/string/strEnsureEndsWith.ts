/**
 * Ensures that a string ends with a specified substring. If the string already ends with the specified substring, it is returned as is. Otherwise, the substring is appended to the end of the string.
 * @param string The string to be processed.
 * @param endsWith The substring that the string should end with.
 * @example ```ts
 * strEnsureEndsWith('Hello', ' World');
 * //=> 'Hello World'
 * strEnsureEndsWith('Hello World', ' World');
 * //=> 'Hello World'
 * ```
 */
export function strEnsureEndsWith(string: string, endsWith: string): string {
  return string.endsWith(endsWith) ? string : string + endsWith
}

/**
 * Removes consecutive empty lines from a given string.
 * @param code The string from which to remove consecutive empty lines.
 * @example ```ts
 * strNoConsecutiveEmptyLines("Hello\n\n\nWorld");;
 * //=> "Hello\n\nWorld"
 * ```
 */
export function strNoConsecutiveEmptyLines(code: string): string {
  return code.replace(/\n\n+/g, '\n\n')
}

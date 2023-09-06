/**
 * This function returns an array of valid flags for regular expressions in JavaScript.
 * @returns An array of valid flags for regular expressions.
 * Returns an array of all valid flags for a regular expression.
 * @example ```ts
 * regexValidFlags() //=> ['g', 'i', 'm', 's', 'u', 'y']
 * ```
 */
export function regexValidFlags(): string[] {
  return ['g', 'i', 'm', 's', 'u', 'y']
}

import { rexec } from '@bemoje/regex'

/**
 * Strips JSDoc style types and default values from the provided code.
 * @remarks This function is useful when you want to remove TypeScript types from a code string.
 * @param code The TypeScript code string from which types should be stripped.
 * @returns The provided code string with all TypeScript types removed.
 * @example ```ts
 * const code = [
 *   '/**',
 *   ' * @returns {string} a string',
 *   ' *\/',
 *   //
 * ].join('\n')
 * const actual = tsDocStripTypesAndDefaults(code)
 * const expected = [
 *   '/**',
 *   ' * @returns a string',
 *   ' *\/',
 *   //
 * ].join('\n')
 * ```
 */
export function tsDocStripTypesAndDefaults(code: string): string {
  for (const match of rexec(/^\s*(\* +)?@\w+ (?<type>\{.+\} )/gm, code)) {
    code = code.replace(match.groups.type, '')
  }
  for (const match of rexec(/^\s*(\* +)?@\w+ (?<defaultValue>\[.+\] )/gm, code)) {
    const tagName = match.groups.defaultValue.split('=')[0].trim().substring(1) + ' '
    code = code.replace(match.groups.defaultValue, tagName)
  }
  return code
}

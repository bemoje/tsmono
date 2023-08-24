import { strRemoveEmptyLines, strTrimLines } from '@bemoje/string'

/**
 * Minifies the given TypeScript code by removing empty lines and trimming lines.
 * @param string The TypeScript code to minify.
 * @returns The minified TypeScript code.
 * @example ```ts
 * //
 * ```
 * @function tsSimpleMinifyCode
 */
export function tsSimpleMinifyCode(string: string): string {
  return strRemoveEmptyLines(strTrimLines(string))
}

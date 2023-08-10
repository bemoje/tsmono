/**
 * Strips the 'export' keyword from the beginning of each line in the provided source string.
 * @param source The source string from which to strip the 'export' keyword.
 * @remarks This function is useful when you want to remove the 'export' keyword from TypeScript code.
 * @returns The source string with the 'export' keyword stripped from the beginning of each line.
 * @example ```ts
 * tsStripExportKeyword('export const foo = "bar";\nexport function baz() {}');;
 * //=> 'const foo = "bar";\nfunction baz() {}'
 * ```
 */
export function tsStripExportKeyword(source: string): string {
  return source.replace(/^export /gm, '')
}

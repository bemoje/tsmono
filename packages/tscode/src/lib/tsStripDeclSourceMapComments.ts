/**
 * Strips out TypeScript declaration source map comments from the provided code string.
 * @remarks This function is useful when you want to clean up TypeScript code for readability or performance reasons.
 * @param code The TypeScript code string from which to strip source map comments.
 * @returns The cleaned TypeScript code string without source map comments.
 * @example ```ts
 * tsStripDeclSourceMapComments(
 *   ['// some code', '//# sourceMappingURL=createEncapsulatingRegex.d.ts.map', ''].join('\n')
 * );
 * //=> '// some code\n'
 * ```
 */
export function tsStripDeclSourceMapComments(code: string): string {
  return code.replace(/\n\s*\/\/#.+\.d\.ts\.map(\n|$)/g, '\n')
}

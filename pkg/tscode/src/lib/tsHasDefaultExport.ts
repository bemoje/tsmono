/**
 * Checks if the provided TypeScript code has a default export.
 * @param code - The TypeScript code to check.
 * @returns A boolean indicating whether the provided TypeScript code has a default export.
 * @example ```ts
 * const code = `export default function() {}`;
 * tsHasDefaultExport(code);
 * //=> true
 * ```
 */
export function tsHasDefaultExport(code: string): boolean {
  return /^export default /m.test(code)
  //
}

/**
 * Counts the number of export statements in a given code string.
 * @param code - The code string to analyze.
 * @returns The number of export statements found in the code.
 * @example ```ts
 * const code = `
 *   export const foo = 42;
 *   export function bar() {
 *     return "Hello, world!";
 *   }
 * `;
 * const count = tsCountExports(code);
 * //=> 2
 * ```
 */
export function tsCountExports(code: string): number {
  return code.match(/^export /gm)?.length || 0
}

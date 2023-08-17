import { numRange } from '@bemoje/number'
import { tsExtractImports } from './tsExtractImports'

/**
 * Strips all import statements from a given TypeScript code string.
 * @param code - The TypeScript code to strip import statements from.
 * @returns The TypeScript code without import statements.
 * @example ```ts
 * const code = `
 * import { Component } from '@angular/core';
 * import { OnInit } from '@angular/core';
 * const a = 1;
 * `.trim()
 * tsStripImports(code)
 * //=> 'const a = 1;'
 * ```
 */
export function tsStripImports(code: string): string {
  const lines = code.split('\n')
  const imports = tsExtractImports(code)
  const remove = new Set<number>()
  for (const { start, end } of imports) {
    for (const int of numRange(start, end)) remove.add(int)
  }
  return lines
    .filter((_, i) => !remove.has(i))
    .join('\n')
    .trimStart()
}

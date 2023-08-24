/**
 * Wraps the given code in a TSDoc block comment with an @example tag.
 * @returns The wrapped TypeScript code.
 * @param code The code to be wrapped.
 * @example ```ts
 * const code = 'console.log("Hello, world!");';
 * tsWrapDocExample(code);
 * //=> 'console.log("Hello, world!");'
 * ```
 * //
 */
export function tsDocWrapExample(code: string): string {
  return (
    ' * @example ```ts\n' +
    code
      .split('\n')
      .map((line) => ' * ' + line)
      .join('\n') +
    '\n * ```'
  )
}

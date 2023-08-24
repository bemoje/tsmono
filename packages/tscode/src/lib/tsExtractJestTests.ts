import { arrFindLastIndexOf } from '@bemoje/array'

/**
 * Extracts Jest test cases from a given TypeScript code string.
 * @remarks
 * This function is useful when you want to isolate and analyze test cases from a larger codebase.
 * It works by finding the first line that starts with 'describe(' and the last line that is '})', and returns the lines in between.
 * If it cannot find these lines, it throws an error.
 * @param code - The TypeScript code string to extract Jest tests from.
 * @returns The extracted Jest tests as a string.
 * @throws Will throw an error if the input source code does not contain Jest tests.
 */
export function tsExtractJestTests(code: string): string {
  const lines = code.split(/\r?\n/)
  const index = lines.findIndex((line) => line.startsWith('describe('))
  const lastIndex = arrFindLastIndexOf(lines, (line) => line.startsWith('})'))
  if (index === -1 || lastIndex === -1) {
    throw new Error('Could not parse the tests from the input source code.')
  }
  return lines
    .slice(index, lastIndex + 1)
    .join('\n')
    .trim()
}

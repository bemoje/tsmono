/**
 * Converts the name of an exported function or variable in a Jest test suite to use the `.name` property of the exported item.
 * This is useful for keeping test suite names in sync with the names of the items they are testing.
 * @param code - The source code of the Jest test suite.
 * @param funName - The name of the function being tested.
 * @returns The modified source code.
 * @example ```ts
 * const code = `describe('myFunction', () => {...})`;
 * const exportName = 'myFunction';
 * const newCode = tsJestConvertExportNameString(code, exportName);
 * //=> `describe(myFunction.name, () => {...})`
 * ```
 */
export function tsJestConvertExportNameString(code: string, funName: string): string {
  const replaceWith = 'describe(' + funName + '.name'
  return code.replace("describe('" + funName + "'", replaceWith).replace('describe("' + funName + '"', replaceWith)
}

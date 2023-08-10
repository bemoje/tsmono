/**
 * Removes all empty lines from the given string.
 * @remarks This function is particularly useful when dealing with multi-line strings that may have unnecessary empty lines.
 * @param string The string from which to remove empty lines.
 */
export function tsDocRemoveEmptyLines(string: string): string {
  return string.replace(/(^|\n) *\* *(\n|$)/g, '\n')
}

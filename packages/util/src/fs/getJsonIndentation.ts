/**
 * This function calculates the indentation level of a JSON string.
 * @param json - The JSON string whose indentation level is to be calculated.
 * @returns The number of leading spaces on the second line of the JSON string, or 0 if the JSON string has less than two lines or if the second line does not start with any spaces.
 */
export function getJsonIndentation(json: string): number {
  const lines = json.split('\n')
  if (lines.length < 2) return 0
  const leadingSpaces = lines[1].match(/^(\s+)/)
  return leadingSpaces ? leadingSpaces[0].length : 0
}

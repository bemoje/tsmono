/**
 * Creates a parser function that parses a string into a boolean.
 *
 * @param trueValues - An array of strings that are considered true. Defaults to ['TRUE', 'T', 'YES', 'Y', '1'].
 * @param falseValues - An array of strings that are considered false. Defaults to ['', 'FALSE', 'F', 'NO', 'N', '0'].
 */
export function createBooleanParser(
  trueValues: string[] = ['TRUE', 'T', 'YES', 'Y', '1'],
  falseValues: string[] = ['', 'FALSE', 'F', 'NO', 'N', '0']
): (string: string) => boolean {
  return function parseBoolean(string: string): boolean {
    string = string.trim().toUpperCase()
    if (falseValues.includes(string)) return false
    if (trueValues.includes(string)) return true
    throw new TypeError(
      `The value ${string} is not a valid boolean value. Accepted values are: ${[...trueValues, ...falseValues].join(
        ', '
      )}`
    )
  }
}

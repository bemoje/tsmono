/**
 * Parses a string into a boolean.
 *
 * This function takes a string as input and returns a boolean based on the string value.
 * If the string is 'true', it returns true. If the string is 'false', it returns false.
 * If the string is neither 'true' nor 'false', it logs an error message and terminates the process.
 *
 * @param string - The string to be parsed into a boolean.
 * @returns A boolean value based on the input string.
 * @throws Will throw an error if the input string is not 'true' or 'false'.
 */
export function parseBoolean(string: string): boolean {
  if (string !== 'true' && string !== 'false') {
    console.error(`The value ${string} is not a valid boolean value. Accepted values are 'true' and 'false'.`)
    process.exit(1)
  }
  return string === 'true'
}

import { JsonRawPrimitive } from '@bemoje/util'

/**
 * Creates a parser function that parses a delimited string into a list of typed values.
 * The parser function takes a string and returns an array of typed values.
 *
 * @param delimiter - The delimiter used to split the string into individual values.
 * @param parser - The function used to parse each individual value in the string.
 * @returns A function that takes a delimited string and returns an array of typed values.
 * @template T - The type of the values in the list.
 */
export function createTypedListParser<T extends JsonRawPrimitive = JsonRawPrimitive>(
  delimiter: string,
  parser: (value: string) => T
): (value: string) => T[] {
  return function parseList(string: string): T[] {
    return string
      .trim()
      .split(delimiter)
      .map((str) => str.trim())
      .filter((str) => !!str)
      .map((str) => {
        return parser(str)
      })
  }
}

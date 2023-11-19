import { assertThat, JsonRawPrimitive } from '@bemoje/util'
import { createLengthValidator } from '../validators/createLengthValidator'

/**
 * Creates a parser function that parses a delimited string into a list of typed values.
 * The parsers array corresponds to the ordering of the expected input values.
 *
 * @param delimiter - The delimiter used to split the string into individual values.
 * @param parsers - An array of functions used to parse each individual value in the string.
 * @returns A function that takes a delimited string and returns an array of typed values.
 * @template T - The type of the values in the list.
 */
export function createTypedListExactlyParser<T extends JsonRawPrimitive = JsonRawPrimitive>(
  delimiter: string,
  parsers: ((value: string) => T)[]
): (value: string) => T[] {
  const isValidLength = createLengthValidator(parsers.length)
  return function parseList(string: string): T[] {
    return assertThat(
      string
        .trim()
        .split(delimiter)
        .map((str) => str.trim())
        .filter((str) => !!str),
      isValidLength
    ).map((str, i) => parsers[i](str))
  }
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { assertThat } from '../validation/assertThat'
import { createLengthValidator } from '../validation/createLengthValidator'
import { JsonRawPrimitive } from '../types/JsonRawPrimitive'

/**
 * Creates a parser function that parses a delimited string into a list of typed values.
 * The parsers array corresponds to the ordering of the expected input values.
 *
 * @param delimiter - The delimiter used to split the string into individual values.
 * @param parsers - An array of functions used to parse each individual value in the string.
 * @returns A function that takes a delimited string and returns an array of typed values.
 * @template T - The type of the values in the list.
 */
export function createTupleListParser<T extends JsonRawPrimitive = JsonRawPrimitive>(
  delimiter: string,
  parsers: ((value: string) => T)[]
): (value: string) => T[] {
  const isValidLength = createLengthValidator(parsers.length)
  return function parseList(string: string): T[] {
    return assertThat(
      string.split(delimiter).map((str) => str.trim()),
      isValidLength
      // @ts-ignore
    ).map((str, i) => parsers[i](str))
  }
}

import { assertThat } from './assertThat'
import { funSetName } from '../function/funSetName'

/**
 * Creates a function that validates if the length of the input is equal to the specified length.
 * The returned function accepts any value with a 'name' property and is named 'isLengthOf' concatenated with the specified length.
 * @param length - The length to validate against.
 * @throws if length is not an integer.
 */
export function createLengthValidator(length: number) {
  assertThat(length, Number.isInteger)
  return funSetName('isLengthOf' + length, function (input: unknown): boolean {
    return (input as string).length === length
  })
}

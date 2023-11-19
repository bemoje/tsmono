import { createBooleanParser } from './createBooleanParser'

/**
 * Parses a string into a boolean.
 *
 * Accepted values (case insensitive):
 * - true: 'TRUE', 'T', 'YES', 'Y', '1'
 * - false: '', 'FALSE', 'F', 'NO', 'N', '0'
 *
 * @throws Will throw an error if the input string is not a valid input.
 */
export const parseBoolean = createBooleanParser(['TRUE', 'T', 'YES', 'Y', '1'], ['', 'FALSE', 'F', 'NO', 'N', '0'])

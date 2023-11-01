import { XtInvalidError } from '../errors/XtInvalidError'

/**
 * Type assertion that syntactically reads like prose.
 * It uses the name of the validation function to produce the error message.
 * @example ```ts
 * const isPositive = (n: number) => n >= 0
 *
 * assertThat(-5, isPositive)
 * //=> throws ValidationError: Expected 'isPositive' to be 'true' for input: '-5'
 *
 * assertThat(5, isPositive, false)
 * //=> throws ValidationError: Expected 'isPositive' to be 'false' for input: '5'
 * ```
 */
export function assertThat<T>(value: T, validate: (value: T) => boolean, expectation = true): T {
  if (validate(value) === expectation) return value
  throw new XtInvalidError(value, validate, expectation)
}

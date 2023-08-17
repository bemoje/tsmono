/**
 * Type assertion that syntactically reads like prose.
 * It uses the name of the validation function to produce the error message.
 * @example ```ts
 * const isPositive = (n: number) => n >= 0
 *
 * assertion(-5, isPositive)
 * //=> throws TypeError: Expected 'isPositive' to be true for input: '-5'
 *
 * assertion(5, isPositive, false)
 * //=> throws TypeError: Expected 'isPositive' to be false for input: '5'
 * ```
 */
export function assertion<T>(value: T, validate: (value: T) => boolean, expectation = true): T {
  if (validate(value) === expectation) return value
  throw new TypeError(`Expected '${validate.name}' to be ${expectation} for input: ${value}`)
}

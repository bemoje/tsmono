import { XtError } from './XtError'

/**
 * An error type thrown when a value fails a validation function test.
 *
 * Several features inherited from @see XtError
 *
 * @example
 * const isString = (value) => typeof value === 'string'
 *
 * new XtInvalidError(2, isString)
 * //=> XtInvalidError: Expected 'isString' to return 'true' for input: 2
 *
 * new XtInvalidError('Adam', isString, false)
 * //=> XtInvalidError: Expected 'isString' to return 'false' for input: Adam
 */
export class XtInvalidError extends XtError {
  /**
   * Returns a new XtInvalidError instance.
   */
  constructor(value: unknown, validator: string | ((...args: any[]) => boolean), expectation = true) {
    const vname = typeof validator === 'string' ? validator : validator.name
    const q = typeof value === 'string' ? '"' : ''
    super(`Expected '${vname}' to be '${expectation}' for input: ${q + value + q}`)
  }
}

import { XtError } from './XtError'

/**
 * An error type thrown when a value is an unexpected type or value.
 * Several features inherited from @see XtError
 */
export class XtTypeError extends XtError {
  /**
   * Returns a new UnexpectedTypeError instance.
   * @param expected The expected type or value.
   * @param got The type or value actually received.
   */
  constructor(expected: null | undefined | boolean | number | string, got: unknown) {
    super(`Expected ${expected}, but got: ${String(got) || Object.prototype.toString.call(got)}`)
  }
}

import { isPrimitive } from '../validation/isPrimitive'
import { ExtensibleError } from './ExtensibleError'

/**
 * An error class that is thrown in the event of an unexpected type or value.
 *
 * Features inherited from @see ExtensibleError:
 * - The constructor parses the stack trace.
 * - Pretty print for the terminal, see the toString method.
 * - JSON serialized object with parsed stack trace.
 */
export class UnexpectedTypeError extends ExtensibleError {
  /**
   * Returns a new UnexpectedTypeError instance.
   * @param expected The expected type or value.
   * @param got The type or value actually received.
   */
  constructor(expected: TBasicPrimitive, got: unknown) {
    if (!isPrimitive(got)) got = Object.prototype.toString.call(got)
    super(`Expected ${expected}, but got: ${got}`)
  }
}

type TBasicPrimitive = null | undefined | boolean | number | string

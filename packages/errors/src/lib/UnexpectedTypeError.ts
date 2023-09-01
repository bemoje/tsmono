import { isPrimitive } from '@bemoje/validation'
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
   * Helpful details about the error.
   */
  override cause?: { expected: TBasicPrimitive; got: TBasicPrimitive; accepted?: string | TBasicPrimitive[] }

  /**
   * Returns a new UnexpectedTypeError instance.
   * @param expected The expected type or value.
   * @param got The type or value actually received.
   * @param accepted The accepted type(s) or value(s).
   */
  constructor(expected: TBasicPrimitive, got: unknown, accepted?: string | TBasicPrimitive[]) {
    // string normalization
    if (!isPrimitive(got)) got = Object.prototype.toString.call(got)
    if (accepted !== undefined && typeof accepted !== 'string') accepted = accepted.join(', ')
    // super
    const message = `Expected ${expected}, but got: ${got}`
    const cause = { expected, got, ...(accepted ? { accepted } : {}) }
    super(message, cause)
  }
}

type TBasicPrimitive = null | undefined | boolean | number | string

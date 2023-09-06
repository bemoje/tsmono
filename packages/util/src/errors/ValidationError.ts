import { ExtensibleError } from './ExtensibleError'

/**
 * An error class that is thrown in the event of a value failing a validation.
 *
 * Features inherited from @see ExtensibleError:
 * - The constructor parses the stack trace.
 * - Pretty print for the terminal, see the toString method.
 * - JSON serialized object with parsed stack trace.
 */
export class ValidationError extends ExtensibleError {
  /**
   * Returns a new ValidationError instance.
   */
  constructor(value: unknown, validator: string, expectation = true) {
    super(`Expected '${validator}' to return ${expectation} for input: ${value}`)
  }
}
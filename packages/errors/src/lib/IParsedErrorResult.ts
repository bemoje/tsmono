import { IParsedErrorFrame } from './IParsedErrorFrame'

/**
 * Interface for the result of a parsed error.
 */
export interface IParsedErrorResult {
  /**
   * The type of the error.
   */
  type: string

  /**
   * The error message.
   */
  message: string

  /**
   * The stack trace of the error.
   */
  stack: IParsedErrorFrame[]

  /**
   * The cause of the error, if any.
   */
  cause?: unknown
}

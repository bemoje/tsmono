import { IParsedErrorFrame } from './IParsedErrorFrame'

/**
 * Interface for the result of a parsed error.
 */
export interface IParsedErrorResult {
  /**
   * The prettified stack trace of the error if it has one.
   */
  stack: string

  /**
   * The parsed stack trace of the error if there is a stack trace.
   */
  frames: IParsedErrorFrame[]
}

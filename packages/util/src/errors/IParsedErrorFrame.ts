/**
 * Interface for a frame in a parsed error stack trace.
 */
export interface IParsedErrorFrame {
  /**
   * filepath:row:col where the error occurred.
   */
  file: string

  /**
   * The function call that caused the error.
   */
  call: string
}

/**
 * The returned object from the `execBatch` function.
 * @see executeBatchScript
 */
export interface IExecuteBatchScriptResult {
  /**
   * Each line of the stdout feed from the terminal.
   */
  stdout: string[]

  /**
   * Each line of the stderr feed from the terminal.
   */
  stderr: string[]

  /**
   * If an error is thrown during script execution, it is caught and is returned here.
   */
  error: unknown
}

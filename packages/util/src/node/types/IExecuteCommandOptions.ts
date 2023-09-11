/**
 * The options object for the `executeBatchScript` function.
 */

export interface IExecuteCommandOptions {
  /**
   * Whether to omit echo of the commands to the terminal.
   * Defaults to false.
   */
  noEcho?: boolean

  /**
   * Whether to output nothing rather than piping the stdout and stderr to the terminal as the script is running.
   * Defaults to false.
   */
  silent?: boolean

  /**
   * Output is piped directly to stdout. No edtiting of the output. Defaults to false.
   */
  directOutput?: boolean

  /**
   * The working directory to execute the batch script in.
   * Defaults to the current working directory.
   */
  cwd?: string
}

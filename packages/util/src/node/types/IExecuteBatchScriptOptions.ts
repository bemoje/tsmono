/**
 * The options object for the `executeBatchScript` function.
 * @see executeBatchScriptDefaultOptions
 * @see executeBatchScript
 */
export interface IExecuteBatchScriptOptions {
  /**
   * Whether to echo the commands to the terminal.
   * Defaults to false.
   */
  echo?: boolean

  /**
   * Whether to prepend each command with `call`.
   * This instructs each command to wait for the previous command to finish execution before starting.
   * Defaults to false.
   */
  prependWithCall?: boolean

  /**
   * Whether to output nothing rather than piping the stdout and stderr to the terminal as the script is running.
   * Defaults to false.
   */
  silent?: boolean

  /**
   * The working directory to execute the batch script in.
   * Defaults to the current working directory.
   */
  cwd?: string

  /**
   * The directory to write the temporary script file to.
   * Defaults to the TEMP or TMP environment variables.
   * If these do not exist and this option is undefined, an error is thrown.
   */
  tempdir?: string
}

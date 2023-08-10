export interface ITsExtractImportsResult {
  /**
   * The line index where the import statement starts.
   */
  start: number
  /**
   * The line index of the last line of the import statement.
   */
  end: number
  /**
   * The import statement.
   */
  match: string
}

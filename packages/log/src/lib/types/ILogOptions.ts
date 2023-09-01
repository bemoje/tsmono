import type { Format } from 'cli-color'
import { LogLevel } from './LogLevel'

export interface ILogOptions {
  /**
   * The log level for console output. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.
   */
  consoleLogLevel?: LogLevel

  /**
   * The log level for the logfile. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.
   */
  fileLogLevel?: LogLevel

  /**
   * The directory path of the log files.
   */
  logDirpath?: string

  /**
   * Max age of log files in days. If specified, existing log files older than this will be deleted.
   */
  deleteFilesOlderThan?: number

  /**
   * A negative or positive integer representing the timezone offset from UTC, in hours.
   */
  timezone?: number

  /**
   * Color format for debug messages when logged to console.
   */
  debugColor?: Format

  /**
   * Color format for info messages when logged to console.
   */
  infoColor?: Format

  /**
   * Color format for warning messages when logged to console.
   */
  warnColor?: Format

  /**
   * Color format for error messages when logged to console.
   */
  errorColor?: Format
}

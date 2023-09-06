import type kleur from 'kleur'
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
  debugColor?: typeof kleur.gray

  /**
   * Color format for info messages when logged to console.
   */
  infoColor?: typeof kleur.gray

  /**
   * Color format for warning messages when logged to console.
   */
  warnColor?: typeof kleur.gray

  /**
   * Color format for error messages when logged to console.
   */
  errorColor?: typeof kleur.gray
}

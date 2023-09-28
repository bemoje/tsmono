import { EventEmitter } from 'events'
import fs from 'fs-extra'
import path from 'path'
import { MS_IN_DAY } from '../date/constants/MS_IN_DAY'
import { XtError } from '../errors/XtError'
import { appendFileLineSync } from '../fs/appendFileLine/appendFileLineSync'
import { createDirectorySync } from '../fs/createDirectory/createDirectorySync'
import { emptyDirectorySync } from '../fs/emptyDirectory/emptyDirectorySync'
import { colors } from '../node/colors'
import { safeJsonStringify } from '../serialize/safeJsonStringify'
import { strRepeat } from '../string/strRepeat'
import { isPrimitive } from '../validation/isPrimitive'
import { ILogEmitterEventsOptions } from './types/ILogEmitterEventsOptions'
import { ILogOptions } from './types/ILogOptions'
import { LogLevel } from './types/LogLevel'
const { gray, blue, yellow, red } = colors

/**
 * This class is a utility for logging messages to the console and/or a log file.
 * It supports different log levels ('NONE', 'DEBUG', 'INFO', 'WARN', 'ERROR') for both console and file logging.
 * It also supports color formatting for console messages. Different colors can be specified for each log level.
 */
export class Log {
  /**
   * The log level for console output. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.
   */
  protected consoleLogLevel: LogLevel

  /**
   * Whether to debug info to console.
   */
  protected debugToConsole: boolean

  /**
   * Whether to log info to console.
   */
  protected infoToConsole: boolean

  /**
   * Whether to log warnings to console.
   */
  protected warnToConsole: boolean

  /**
   * Whether to log errors to console.
   */
  protected errorToConsole: boolean

  /**
   * The log level for the logfile. Can be 'NONE', 'DEBUG', 'INFO', 'WARN', or 'ERROR'.
   */
  protected fileLogLevel: LogLevel

  /**
   * Whether to log debug info to the logfile.
   */
  protected debugToFile: boolean

  /**
   * Whether to log info to the logfile.
   */
  protected infoToFile: boolean

  /**
   * Whether to log warnings to the logfile.
   */
  protected warnToFile: boolean

  /**
   * Whether to log errors to the logfile.
   */
  protected errorToFile: boolean

  /**
   * The directory path of the log file.
   */
  protected logDirpath: string

  /**
   * A negative or positive integer representing the timezone offset from UTC, in hours.
   */
  protected timezone: number

  /**
   * Default options for creating new instances.
   */
  static optionDefaults: Required<ILogOptions> = {
    consoleLogLevel: LogLevel.DEBUG,
    fileLogLevel: LogLevel.NONE,
    logDirpath: path.join(process.cwd(), 'logs'),
    timezone: 0,
    deleteFilesOlderThan: 0,
  }

  /**
   * Create a new instance.
   * @param options - Options for creating a new instance.
   */
  constructor(options: ILogOptions = {}) {
    // options
    const defaults = Log.optionDefaults
    const _options = { ...defaults, ...options }

    this.consoleLogLevel = _options.consoleLogLevel
    this.debugToConsole = this.consoleLogLevel === LogLevel.DEBUG
    this.infoToConsole = this.debugToConsole || this.consoleLogLevel === LogLevel.INFO
    this.warnToConsole = this.infoToConsole || this.consoleLogLevel === LogLevel.WARN
    this.errorToConsole = this.warnToConsole || this.consoleLogLevel === LogLevel.ERROR

    this.fileLogLevel = _options.fileLogLevel
    this.debugToFile = this.fileLogLevel === LogLevel.DEBUG
    this.infoToFile = this.debugToFile || this.fileLogLevel === LogLevel.INFO
    this.warnToFile = this.infoToFile || this.fileLogLevel === LogLevel.WARN
    this.errorToFile = this.warnToFile || this.fileLogLevel === LogLevel.ERROR

    this.timezone = _options.timezone

    this.logDirpath = path.resolve(_options.logDirpath)
    if (this.fileLogLevel !== LogLevel.NONE) {
      createDirectorySync(this.logDirpath)
    }

    // initialize log file
    this.deleteLogFiles(_options.deleteFilesOlderThan)
    if (this.fileLogLevel !== LogLevel.NONE) this.info({ message: 'Log file created.' })
  }

  /**
   * The filepath of the log file.
   */
  get logFilepath(): string {
    const d = new Date()
    return path.join(
      this.logDirpath,
      `${d.getUTCFullYear()}-${(1 + d.getUTCMonth()).toString().padStart(2, '0')}-${d
        .getUTCDate()
        .toString()
        .padStart(2, '0')}.log`
    )
  }

  /**
   * Re-initialize the current instance with the specified options.
   */
  initialize(options: ILogOptions = {}): void {
    Object.assign(this, new Log(options))
  }

  /**
   * Logs a debug message the console.
   * @param data The message to print to console.
   * @param depth The depth to which to print object properties.
   */
  debug<T>(data: T, depth?: number): T {
    if (this.debugToFile) this.logToFile(LogLevel.DEBUG, data)
    if (this.debugToConsole) {
      console.debug(gray(LogLevel.DEBUG.toUpperCase()))
      if (depth) console.dir(data, { depth })
      else console.debug(isPrimitive(data) ? gray(String(data)) : data)
    }
    return data
  }

  /**
   * Logs an info message the console.
   * @param data The message to print to console.
   * @param depth The depth to which to print object properties.
   */
  info<T>(data: T, depth?: number): T {
    if (this.infoToFile) this.logToFile(LogLevel.INFO, data)
    if (this.infoToConsole) {
      console.log(blue(LogLevel.INFO.toUpperCase()))
      if (depth) console.dir(data, { depth })
      else console.log(isPrimitive(data) ? blue(String(data)) : data)
    }
    return data
  }

  /**
   * Logs a warning message to the console.
   * @param data The message to print to console.
   */
  warn<T>(data: T, depth?: number): T {
    if (this.warnToFile) this.logToFile(LogLevel.WARN, data)
    if (this.warnToConsole) {
      console.warn(yellow(LogLevel.WARN.toUpperCase()))
      if (depth) console.dir(data, { depth })
      else console.warn(isPrimitive(data) ? yellow(String(data)) : data)
    }
    return data
  }

  /**
   * Logs a error message to the console.
   * @param error The Error object or message to print to console.
   */
  error<T>(error: T | Error): T | Error {
    if (this.errorToFile) this.logToFile(LogLevel.ERROR, error)
    if (this.errorToConsole) {
      console.error(red(LogLevel.ERROR.toUpperCase()))
      console.log((error as Error).toString())
    }
    return error
  }

  /**
   * Delete log files older than the specified number of days.
   * @param deleteFilesOlderThan The maximum age of log files in days. If not specified, no files will be deleted.
   */
  deleteLogFiles(deleteFilesOlderThan = 0): void {
    if (deleteFilesOlderThan === 0) return
    if (!fs.existsSync(this.logDirpath)) return
    emptyDirectorySync(this.logDirpath, (stat) => {
      const ageMs = Date.now() - stat.ctimeMs
      const ageDays = ageMs / MS_IN_DAY
      return ageDays > deleteFilesOlderThan
    })
  }

  /**
   * Prints a given number of blank lines to the console.
   * @remarks This is not logged to the log file.
   * @param numLines The number of blank lines to print.
   */
  newline(numLines = 10): void {
    console.log(strRepeat('\n', numLines))
  }

  /**
   * Prints a given number of lines with dashes to the console.
   * @remarks This is not logged to the log file.
   * @param numLines The number of dash lines to print.
   * @param width The number of dashes per line.
   */
  dashline(numLines = 1, width = 80): void {
    const string = gray(strRepeat('-', width))
    for (let i = 0; i < numLines; i++) {
      console.log(string)
    }
  }

  /**
   * This function is used to print the events emitted by an EventEmitter.
   * @remarks This function allows you to see what events are being emitted by an EventEmitter at runtime.
   * @param emitter The EventEmitter that is emitting the events.
   * @param options Options for logging the events.
   */
  logEmitterEvents(emitter: EventEmitter, options: ILogEmitterEventsOptions = {}): void {
    const { eventNamePrefix, debug, info, warn, error } = options
    const events = { debug, info, warn, error }
    for (const [level, names] of Object.entries(events)) {
      if (!names) continue
      for (const event of names) {
        emitter.on(event, (data: unknown | Error) => {
          const _level = level as 'debug' | 'info' | 'warn' | 'error'
          if (_level === 'error') {
            this.error(new XtError(data))
          } else {
            if (isPrimitive(data)) data = { message: data }
            this[_level]({
              event: eventNamePrefix ? eventNamePrefix + '.' + event : event,
              ...(data as Record<string, unknown>),
            })
          }
        })
      }
    }
  }

  /**
   * Write log entry to logfile
   * @param loglevel The log level.
   * @param data The message to print to console.
   */
  protected logToFile<T>(loglevel: LogLevel, data: T | Error): void {
    const d = new Date()
    const timestamp = `${(d.getUTCHours() + this.timezone).toString().padStart(2, '0')}:${d
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${d.getUTCSeconds().toString().padStart(2, '0')}`
    const level = loglevel.toUpperCase().padEnd(5, ' ')
    const entry = `${timestamp}|${level}|${safeJsonStringify(data)}`
    appendFileLineSync(this.logFilepath, entry)
  }

  /**
   * Get the current instance's properties.
   */
  getProperties() {
    return {
      consoleLogLevel: this.consoleLogLevel,
      debugToConsole: this.debugToConsole,
      infoToConsole: this.infoToConsole,
      warnToConsole: this.warnToConsole,
      errorToConsole: this.errorToConsole,
      fileLogLevel: this.fileLogLevel,
      debugToFile: this.debugToFile,
      infoToFile: this.infoToFile,
      warnToFile: this.warnToFile,
      errorToFile: this.errorToFile,
      logDirpath: this.logDirpath,
      logFilepath: this.logFilepath,
      timezone: this.timezone,
    }
  }
}

// process.on('uncaughtException', (error) => {
//   throw new XtError(error)
// })

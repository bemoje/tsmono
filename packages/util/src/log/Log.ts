import { EventEmitter } from 'events'
import fs from 'fs'
import path from 'path'
import { MS_IN_DAY } from '../date/constants/MS_IN_DAY'
import { XtError } from '../errors/XtError'
import { appendLineToFile } from '../fs/appendLineToFile'
import { cleanDirectorySync } from '../fs/cleanDirectorySync'
import { createDirectorySync } from '../fs/createDirectorySync'
import { colors } from '../node/colors'
import { objClonePrimitiveProperties } from '../object/objClonePrimitiveProperties'
import { strRepeat } from '../string/strRepeat'
import { isPrimitive } from '../validation/isPrimitive'
import { ILogEmitterEventsOptions } from './types/ILogEmitterEventsOptions'
import { ILogOptions } from './types/ILogOptions'
import { LogLevel } from './types/LogLevel'
const { gray, green, yellow, red } = colors

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
   * Color format for debug messages when logged to console.
   */
  protected debugColor: typeof gray

  /**
   * Color format for info messages when logged to console.
   */
  protected infoColor: typeof gray

  /**
   * Color format for warning messages when logged to console.
   */
  protected warnColor: typeof gray

  /**
   * Color format for error messages when logged to console.
   */
  protected errorColor: typeof gray

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

    this.debugColor = gray
    this.infoColor = green
    this.warnColor = yellow
    this.errorColor = red

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
    return path.join(this.logDirpath, `${d.getUTCFullYear()}-${1 + d.getUTCMonth()}-${d.getUTCDate()}.log`)
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
  debug<T extends Record<string, unknown>>(data: T, depth?: number): T {
    if (this.debugToFile) this._logToFile(LogLevel.DEBUG, data)
    if (this.debugToConsole) {
      if (isPrimitive(data)) {
        console.debug(gray(LogLevel.DEBUG) + ': ' + String(data))
      } else {
        console.debug(gray(LogLevel.DEBUG))
        if (depth) console.dir(data, { depth })
        else console.debug(data)
      }
    }
    return data
  }

  /**
   * Logs an info message the console.
   * @param data The message to print to console.
   * @param depth The depth to which to print object properties.
   */
  info<T extends Record<string, unknown>>(data: T): T {
    if (this.infoToFile) this._logToFile(LogLevel.INFO, data)
    if (this.infoToConsole) this._logToConsole(LogLevel.INFO, data, this.infoColor)
    return data
  }

  /**
   * Logs a warning message to the console.
   * @param data The message to print to console.
   */
  warn<T extends Record<string, unknown>>(data: T): T {
    if (this.warnToFile) this._logToFile(LogLevel.WARN, data)
    if (this.warnToConsole) this._logToConsole(LogLevel.WARN, data, this.warnColor)
    return data
  }

  /**
   * Logs a error message to the console.
   * @param data The Error object or message to print to console.
   */
  error<T extends Record<string, unknown>>(data: T): T {
    if (this.errorToFile) this._logToFile(LogLevel.ERROR, data)
    if (this.errorToConsole) this._logToConsole(LogLevel.ERROR, data, this.errorColor)
    return data
  }

  // /**
  //  * Wrap an async function as a task, logging the start and end of the task.
  //  * @param description The description of the task.
  //  */
  // async task<T extends Record<string, unknown>>(description: string, task: () => Promise<T>): Promise<T> {
  //   this.info(`Began: ${description}.`)
  //   const t0 = Date.now()
  //   const returnValue = await task()
  //   this.debug(`Ended: ${description}. (${((Date.now() - t0) / 1000).toString()} seconds)`)
  //   return returnValue
  // }

  // /**
  //  * Wrap a synchronous function as a task, logging the start and end of the task.
  //  * @param description The description of the task.
  //  */
  // taskSync<T extends Record<string, unknown>>(description: string, task: () => T): T {
  //   this.info(`Began: ${description}.`)
  //   const t0 = Date.now()
  //   const returnValue = task()
  //   this.debug(`Ended: ${description}. (${((Date.now() - t0) / 1000).toString()} seconds)`)
  //   return returnValue
  // }

  /**
   * Delete log files older than the specified number of days.
   * @param deleteFilesOlderThan The maximum age of log files in days. If not specified, no files will be deleted.
   */
  deleteLogFiles(deleteFilesOlderThan = 0): void {
    if (deleteFilesOlderThan === 0) return
    if (!fs.existsSync(this.logDirpath)) return
    cleanDirectorySync(this.logDirpath, (_, stat) => {
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
    objClonePrimitiveProperties
    const { eventNamePrefix, debug, info, warn, error } = options
    const events = { debug, info, warn, error }
    for (const [level, names] of Object.entries(events)) {
      if (!names) continue
      for (const event of names) {
        emitter.on(event, (data: Record<string, unknown> | Error) => {
          const _level = level as 'debug' | 'info' | 'warn' | 'error'
          if (data instanceof Error) data = new XtError(data)
          this[_level]({ event: eventNamePrefix ? eventNamePrefix + '.' + event : event, ...data })
        })
      }
    }
  }

  /**
   * Write log entry to logfile
   * @param loglevel The log level.
   * @param data The message to print to console.
   */
  _logToFile<T extends Record<string, unknown>>(loglevel: LogLevel, data: T): void {
    const d = new Date()
    const timestamp = `${d.getUTCHours()}.${1 + d.getUTCMinutes()}.${d.getUTCSeconds()}`
    const level = loglevel.padEnd(5, ' ')
    const entry = `${timestamp}|${level}|${JSON.stringify(data)}`
    appendLineToFile(this.logFilepath, entry, false).catch((error) => {
      console.error(error)
    })
  }

  /**
   * Generic function for logging to console, used by the log-level specific functions.
   * @param loglevel The log level.
   * @param data The message to print to console.
   * @param levelColor A function to wrap the level-part of the string in color formatting.
   * @param color A function to wrap the output-part of the string in color formatting.
   */
  _logToConsole<T extends Record<string, unknown>>(loglevel: LogLevel, data: T, color: typeof gray): void {
    const log = loglevel === LogLevel.WARN ? console.warn : loglevel === LogLevel.ERROR ? console.error : console.log
    log(color(loglevel))
    log(data)
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
      debugColor: this.debugColor,
      infoColor: this.infoColor,
      warnColor: this.warnColor,
      errorColor: this.errorColor,
    }
  }
}

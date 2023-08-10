import { appendLineToFile, cleanDirectorySync, createDirectorySync } from '@bemoje/fs'
import { MS_IN_DAY, ObjectKey, isObject, isoDateTimestampForFilename } from '@bemoje/node-util'
import { strRepeat } from '@bemoje/string'
import type { Format } from 'cli-color'
import { blackBright, green, red, yellow } from 'cli-color'
import { EventEmitter } from 'events'
import fs from 'fs'
import path from 'path'
import { ILogEmitterEventsOptions } from './types/ILogEmitterEventsOptions'
import { ILogOptions } from './types/ILogOptions'
import { LogLevel } from './types/LogLevel'

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
   * The filepath of the log file.
   */
  protected logFilepath: string

  /**
   * Color format for debug messages when logged to console.
   */
  protected debugColor: Format

  /**
   * Color format for info messages when logged to console.
   */
  protected infoColor: Format

  /**
   * Color format for warning messages when logged to console.
   */
  protected warnColor: Format

  /**
   * Color format for error messages when logged to console.
   */
  protected errorColor: Format

  /**
   * Default options for creating new instances.
   */
  static optionDefaults: Required<ILogOptions> = {
    consoleLogLevel: LogLevel.DEBUG,
    fileLogLevel: LogLevel.NONE,
    logDirpath: path.join(process.cwd(), 'logs'),
    deleteFilesOlderThan: 0,
    debugColor: blackBright,
    infoColor: green,
    warnColor: yellow,
    errorColor: red,
  }

  /**
   * Create a new instance.
   * @param options - Options for creating a new instance.
   */
  constructor(options: ILogOptions = {}) {
    // options
    // const defaults = Object.getPrototypeOf(this).constructor.optionDefaults
    const defaults = Log.optionDefaults
    const _options = { ...defaults, ...options }

    this.debugColor = _options.debugColor
    this.infoColor = _options.infoColor
    this.warnColor = _options.warnColor
    this.errorColor = _options.errorColor

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

    this.logDirpath = path.resolve(_options.logDirpath)
    if (this.fileLogLevel !== LogLevel.NONE) {
      createDirectorySync(this.logDirpath)
    }
    this.logFilepath = path.join(this.logDirpath, isoDateTimestampForFilename() + '.txt')

    // initialize log file
    this.deleteLogFiles(_options.deleteFilesOlderThan)
    if (this.fileLogLevel !== LogLevel.NONE) this.info('Log file created.')
  }

  /**
   * Re-initialize the current instance with the specified options.
   */
  initialize(options: ILogOptions = {}): void {
    Object.assign(this, new Log(options))
  }

  /**
   * Logs a debug message the console.
   * @param message The message to print to console.
   * @param depth The depth to which to print object properties.
   */
  debug<T>(message: T, depth?: number | null): T {
    if (this.debugToFile) this._logToFile(LogLevel.DEBUG, message)
    if (this.debugToConsole) this._logToConsole(LogLevel.DEBUG, message, this.debugColor, depth)
    return message
  }

  /**
   * Logs an info message the console.
   * @param message The message to print to console.
   * @param depth The depth to which to print object properties.
   */
  info<T>(message: T, depth?: number | null): T {
    if (this.infoToFile) this._logToFile(LogLevel.INFO, message)
    if (this.infoToConsole) this._logToConsole(LogLevel.INFO, message, this.infoColor, depth)
    return message
  }

  /**
   * Logs a warning message to the console.
   * @param message The message to print to console.
   */
  warn<T>(message: T, depth?: number | null): T {
    if (this.warnToFile) this._logToFile(LogLevel.WARN, message)
    if (this.warnToConsole) this._logToConsole(LogLevel.WARN, message, this.warnColor, depth)
    return message
  }

  /**
   * Logs a error message to the console.
   * @param message The Error object or message to print to console.
   */
  error<T>(message: T, depth?: number | null): T {
    if (this.errorToFile) this._logToFile(LogLevel.ERROR, message)
    if (this.errorToConsole) this._logToConsole(LogLevel.ERROR, message, this.errorColor, depth)
    return message
  }

  /**
   * Wrap an async function as a task, logging the start and end of the task.
   * @param description The description of the task.
   */
  async task<T>(description: string, task: () => Promise<T>): Promise<T> {
    this.info(`Began: ${description}.`)
    const t0 = Date.now()
    const returnValue = await task()
    this.debug(`Ended: ${description}. (${((Date.now() - t0) / 1000).toString()} seconds)`)
    return returnValue
  }

  /**
   * Wrap a synchronous function as a task, logging the start and end of the task.
   * @param description The description of the task.
   */
  taskSync<T>(description: string, task: () => T): T {
    this.info(`Began: ${description}.`)
    const t0 = Date.now()
    const returnValue = task()
    this.debug(`Ended: ${description}. (${((Date.now() - t0) / 1000).toString()} seconds)`)
    return returnValue
  }

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
    const string = blackBright(strRepeat('-', width))
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
        emitter.on(event, (info: string, data: any, origin: any) => {
          const _level = level as 'debug' | 'info' | 'warn' | 'error'
          this[_level]({
            type: eventNamePrefix,
            info,
            ...(isObject(data) ? data : data === undefined ? {} : { data }),
          })
        })
      }
    }
  }

  /**
   * Write log entry to logfile
   * @param loglevel The log level.
   * @param message The message to print to console.
   */
  _logToFile<T>(loglevel: LogLevel, message: T): void {
    const timestamp = new Date().toISOString()
    const data = JSON.stringify({ message })
    const entry = `${loglevel.padEnd(5, ' ')}|${timestamp}|${data}`
    appendLineToFile(this.logFilepath, entry, false).catch((error) => {
      console.error(error)
    })
  }

  /**
   * Generic function for logging to console, used by the log-level specific functions.
   * @param loglevel The log level.
   * @param message The message to print to console.
   * @param levelColor A 'cli-color' module function to wrap the level-part of the string in color formatting.
   * @param color A 'cli-color' module function to wrap the output-part of the string in color formatting.
   * @param depth The depth to which to print object properties.
   */
  _logToConsole<T>(loglevel: LogLevel, message: T, color: Format, depth?: number | null): void {
    const toConsole =
      loglevel === LogLevel.WARN ? console.warn : loglevel === LogLevel.ERROR ? console.error : console.log
    if (isObject(message)) {
      toConsole(`[${color(loglevel)}]:`)
      if (depth !== undefined) console.dir(message, { depth })
      else toConsole(message)
    } else {
      let msg = message + ''
      if (msg.includes('\n')) msg = '\n' + msg
      toConsole(`[${color(loglevel)}]: ${color(msg) + ''}`)
    }
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
      debugColor: this.debugColor,
      infoColor: this.infoColor,
      warnColor: this.warnColor,
      errorColor: this.errorColor,
    }
  }
}

function objClonePrimitiveProperties<T extends Record<ObjectKey, any>>(o: T): T {
  if (!isObject(o)) return o
  const clone: Record<ObjectKey, any> = {}
  for (const [key, value] of Object.entries(o)) {
    if (isPrimitive(value)) clone[key] = value
  }
  return clone
}

function isPrimitive(value: any) {
  return (typeof value !== 'object' && typeof value !== 'function') || value === null
}

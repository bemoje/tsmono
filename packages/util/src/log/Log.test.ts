import EventEmitter from 'events'
import path from 'path'
import { Log } from './Log'
import { LogLevel } from './types/LogLevel'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const logDirpath = path.join(process.env['TEMP']!, 'test-logs')

describe(Log.name, () => {
  beforeEach(() => {
    console.log = jest.fn()
    console.warn = jest.fn()
    console.error = jest.fn()
    console.dir = jest.fn()
  })

  describe('constructor', () => {
    it('should create a new instance with default options', () => {
      const logger = new Log({ logDirpath })
      const props = logger.getProperties()
      expect(props.consoleLogLevel).toBe(LogLevel.DEBUG)
      expect(props.debugToConsole).toBe(true)
      expect(props.infoToConsole).toBe(true)
      expect(props.warnToConsole).toBe(true)
      expect(props.errorToConsole).toBe(true)
      expect(props.fileLogLevel).toBe(LogLevel.NONE)
      expect(props.debugToFile).toBe(false)
      expect(props.infoToFile).toBe(false)
      expect(props.warnToFile).toBe(false)
      expect(props.errorToFile).toBe(false)
      expect(typeof props.logDirpath).toBe('string')
      expect(typeof props.logFilepath).toBe('string')
    })
  })

  it('should create a new instance with custom options', () => {
    const logger = new Log({
      consoleLogLevel: LogLevel.INFO,
      fileLogLevel: LogLevel.ERROR,
      logDirpath,
      deleteFilesOlderThan: 7,
    })
    const props = logger.getProperties()
    expect(props.consoleLogLevel).toBe(LogLevel.INFO)
    expect(props.debugToConsole).toBe(false)
    expect(props.infoToConsole).toBe(true)
    expect(props.warnToConsole).toBe(true)
    expect(props.errorToConsole).toBe(true)
    expect(props.fileLogLevel).toBe(LogLevel.ERROR)
    expect(props.debugToFile).toBe(false)
    expect(props.infoToFile).toBe(false)
    expect(props.warnToFile).toBe(false)
    expect(props.errorToFile).toBe(true)
    expect(typeof props.logDirpath).toBe('string')
    expect(typeof props.logFilepath).toBe('string')
  })
})

describe('initialize', () => {
  it('should re-initialize the current instance with the specified options', () => {
    const logger = new Log({
      logDirpath,
    })
    logger.initialize({
      consoleLogLevel: LogLevel.ERROR,
    })
    const props = logger.getProperties()
    expect(props.consoleLogLevel).toBe(LogLevel.ERROR)
  })
})

describe('debug', () => {
  it('should log a debug message to the console and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = 'This is a debug message'
    const result = logger.debug(message)
    expect(result).toBe(message)
  })

  it('should log a debug message to the console with depth and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = { prop1: 'value1', prop2: 'value2' }
    const result = logger.debug(message, 1)
    expect(result).toBe(message)
  })

  it('should log a debug message to the console and the log file', () => {
    const logger = new Log({
      fileLogLevel: LogLevel.DEBUG,
      logDirpath,
    })
    const message = 'This is a debug message'
    const result = logger.debug(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is logged to the log fileasdsa
  })

  it('should not log a debug message to the console or the log file', () => {
    const logger = new Log({
      consoleLogLevel: LogLevel.NONE,
      fileLogLevel: LogLevel.NONE,
      logDirpath,
    })
    const message = 'This is a debug message'
    const result = logger.debug(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is not logged to the console or the log file
  })
})

describe('info', () => {
  it('should log an info message to the console and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = 'This is an info message'
    const result = logger.info(message)
    expect(result).toBe(message)
  })

  it('should log an info message to the console with depth and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = { prop1: 'value1', prop2: 'value2' }
    const result = logger.info(message, 1)
    expect(result).toBe(message)
  })

  it('should log an info message to the console and the log file', () => {
    const logger = new Log({
      fileLogLevel: LogLevel.INFO,
      logDirpath,
    })
    const message = 'This is an info message'
    const result = logger.info(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is logged to the log file
  })

  it('should not log an info message to the console or the log file', () => {
    const logger = new Log({
      consoleLogLevel: LogLevel.NONE,
      fileLogLevel: LogLevel.NONE,
      logDirpath,
    })
    const message = 'This is an info message'
    const result = logger.info(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is not logged to the console or the log file
  })
})

describe('warn', () => {
  it('should log a warning message to the console and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = 'This is a warning message'
    const result = logger.warn(message)
    expect(result).toBe(message)
  })

  it('should log a warning message to the console with depth and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = { prop1: 'value1', prop2: 'value2' }
    const result = logger.warn(message, 1)
    expect(result).toBe(message)
  })

  it('should log a warning message to the console and the log file', () => {
    const logger = new Log({
      fileLogLevel: LogLevel.WARN,
      logDirpath,
    })
    const message = 'This is a warning message'
    const result = logger.warn(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is logged to the log file
  })

  it('should not log a warning message to the console or the log file', () => {
    const logger = new Log({
      consoleLogLevel: LogLevel.NONE,
      fileLogLevel: LogLevel.NONE,
      logDirpath,
    })
    const message = 'This is a warning message'
    const result = logger.warn(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is not logged to the console or the log file
  })
})

describe('error', () => {
  it('should log an error message to the console and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = 'This is an error message'
    const result = logger.error(message)
    expect(result).toBe(message)
  })

  it('should log an error message to the console with depth and return the message', () => {
    const logger = new Log({ logDirpath })
    const message = { prop1: 'value1', prop2: 'value2' }
    const result = logger.error(message)
    expect(result).toBe(message)
  })

  it('should log an error message to the console and the log file', () => {
    const logger = new Log({
      fileLogLevel: LogLevel.ERROR,
      logDirpath,
    })
    const message = 'This is an error message'
    const result = logger.error(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is logged to the log file
  })

  it('should not log an error message to the console or the log file', () => {
    const logger = new Log({
      consoleLogLevel: LogLevel.NONE,
      fileLogLevel: LogLevel.NONE,
      logDirpath,
    })
    const message = 'This is an error message'
    const result = logger.error(message)
    expect(result).toBe(message)
    // TODO: Verify that the message is not logged to the console or the log file
  })
})

describe('task', () => {
  it('should log the start and end of a task and return the result', async () => {
    const logger = new Log({ logDirpath })
    const description = 'Task description'
    const task = jest.fn().mockResolvedValue('Task result')
    const result = await logger.task(description, task)
    expect(result).toBe('Task result')
  })
})

describe('taskSync', () => {
  it('should log the start and end of a synchronous task and return the result', () => {
    const logger = new Log({ logDirpath })
    const description = 'Task description'
    const task = jest.fn().mockReturnValue('Task result')
    const result = logger.taskSync(description, task)
    expect(result).toBe('Task result')
  })
})

describe('deleteLogFiles', () => {
  it('should delete log files older than the specified number of days', () => {
    const logger = new Log({ logDirpath })
    const deleteFilesOlderThan = 7
    logger.deleteLogFiles(deleteFilesOlderThan)
    // TODO: Verify that log files older than 7 days are deleted
  })

  it('should not delete any log files if deleteFilesOlderThan is not specified', () => {
    const logger = new Log({ logDirpath })
    logger.deleteLogFiles()
    // TODO: Verify that no log files are deleted
  })

  it('should not delete any log files if the log directory does not exist', () => {
    const logger = new Log({ logDirpath })
    logger.deleteLogFiles(7)
    // TODO: Verify that no log files are deleted
  })
})

describe('newline', () => {
  it('should print the specified number of blank lines to the console', () => {
    const logger = new Log({ logDirpath })
    const numLines = 5
    logger.newline(numLines)
    // TODO: Verify that 5 blank lines are printed to the console
  })

  it('should print 10 blank lines to the console if the number of lines is not specified', () => {
    const logger = new Log({ logDirpath })
    logger.newline()
    // TODO: Verify that 10 blank lines are printed to the console
  })
})

describe('dashline', () => {
  it('should print the specified number of lines with dashes to the console', () => {
    const logger = new Log({ logDirpath })
    const numLines = 3
    const width = 80
    logger.dashline(numLines, width)
    // TODO: Verify that 3 lines with dashes are printed to the console
  })

  it('should print 1 line with dashes to the console if the number of lines is not specified', () => {
    const logger = new Log({ logDirpath })
    const width = 80
    logger.dashline(undefined, width)
    // TODO: Verify that 1 line with dashes is printed to the console
  })

  it('should print 1 line with 80 dashes to the console if the width is not specified', () => {
    const logger = new Log({ logDirpath })
    const numLines = 3
    logger.dashline(numLines)
    // TODO: Verify that 3 lines with 80 dashes are printed to the console
  })
})

describe('logEmitterEvents', () => {
  it('should log emitted events to the console', () => {
    const logger = new Log({ logDirpath })
    const emitter = new EventEmitter()
    const options = {
      eventNamePrefix: 'ClassName',
      debug: ['event1', 'event2'],
      info: ['event3'],
      warn: ['event4'],
      error: ['event5'],
    }
    logger.logEmitterEvents(emitter, options)
    // TODO: Emit events and verify that they are logged to the console
  })
})

describe('getProperties', () => {
  it("should return the current instance's properties", () => {
    const logger = new Log({ logDirpath })
    const properties = logger.getProperties()
    expect(properties).toEqual({
      consoleLogLevel: LogLevel.DEBUG,
      debugToConsole: true,
      infoToConsole: true,
      warnToConsole: true,
      errorToConsole: true,
      fileLogLevel: LogLevel.NONE,
      debugToFile: false,
      infoToFile: false,
      warnToFile: false,
      errorToFile: false,
      logDirpath: expect.any(String),
      logFilepath: expect.any(String),
      timezone: 0,
      debugColor: expect.any(Function),
      infoColor: expect.any(Function),
      warnColor: expect.any(Function),
      errorColor: expect.any(Function),
    })
  })
})

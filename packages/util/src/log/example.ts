import { EventEmitter } from 'events'
import path from 'path'
import { Log } from './Log'
import { LogLevel } from './types/LogLevel'

function example() {
  const log = new Log({
    fileLogLevel: LogLevel.INFO,
    logDirpath: path.join(__dirname, 'logs'),
  })

  const events = new EventEmitter()

  log.logEmitterEvents(events, {
    eventNamePrefix: 'sejt',
    error: ['error'],
    warn: ['warn'],
    info: ['info'],
    debug: ['debug'],
  })

  events.emit('warn', { message: 'warn' })
  events.emit('error', new Error('this is an error'))
  events.emit('info', { message: 'info', info: { a: 1, b: { c: 2 } } })
  events.emit('debug', { message: 'debug' })
}
example()

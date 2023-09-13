import { EventEmitter } from 'events'
import path from 'path'
import { Log } from './Log'
import { LogLevel } from './types/LogLevel'

function example() {
  const log = new Log({
    fileLogLevel: LogLevel.INFO,
    logDirpath: path.join(__dirname, 'logs'),
    timezone: 2,
  })

  const events = new EventEmitter()

  log.logEmitterEvents(events, {
    eventNamePrefix: 'sejt',
    error: ['error'],
    warn: ['warn'],
    info: ['info'],
    debug: ['debug'],
  })

  events.emit('warn', { message: 'this is a warning for you' })
  events.emit('debug', { message: 'some boring debugging info' })
  events.emit('error', new Error('this is an error'))
  events.emit('warn', 'this is another warning for you')
  events.emit('info', { message: 'here is info', info: { a: 1, b: { c: 2 } } })
}

example()

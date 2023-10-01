import { XtError } from '../errors/XtError'
import { LoggedEventEmitter } from './LoggedEventEmitter'
import { LogLevel } from './types/LogLevel'

function example() {
  LoggedEventEmitter.subscribe(LogLevel.DEBUG, console.log)
    .subscribe(LogLevel.INFO, console.log)
    .subscribe(LogLevel.WARN, console.log)
    .subscribe(LogLevel.ERROR, console.error)

  const events = new LoggedEventEmitter('tester')
  events.emitDebug({ index: 251, details: 'These are debug details' })
  events.emitInfo('it is saturday now')
  events.emitWarn('you have many things to do')
  events.emitError(
    Object.assign(new XtError('This is an error message (XtError).'), {
      index: 251,
      details: 'These are error details',
    })
  )
}
example()

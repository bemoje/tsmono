import { Any, colors } from '@bemoje/util'
import { MethodDisabler } from './util/MethodDisabler'

const stdout = new MethodDisabler(process.stdout, 'write')
const stderr = new MethodDisabler(process.stderr, 'write')
const debug = new MethodDisabler(console, 'debug')
debug.disable()

/**
 *
 */
export class OutputManager {
  private static instance: OutputManager

  static getInstance() {
    if (!this.instance) {
      this.instance = new OutputManager()
    }
    return this.instance
  }

  readonly colors = colors
  readonly stdout = stdout
  readonly stderr = stderr
  readonly debug = debug
  debugMsgs: (() => Any)[] = []

  reset() {
    this.colors.enable()
    this.stdout.enable()
    this.stderr.enable()
    this.debug.disable()
    return this
  }

  outputDebug(fn: () => Any) {
    if (this.debug.isEnabled) console.debug(fn())
    else this.debugMsgs.push(fn)
  }

  outputDebugMessages() {
    this.debugMsgs.forEach((fn) => console.debug(fn()))
    this.debugMsgs = []
  }
}

import { Any, colors, MethodDisabler } from '@bemoje/util'
import { countInstance } from './counter'

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
  readonly stdout = new MethodDisabler(process.stdout, 'write')
  readonly stderr = new MethodDisabler(process.stderr, 'write')
  readonly debug = new MethodDisabler(console, 'debug')
  readonly debugMsgQueue: (() => Any)[] = []

  constructor() {
    countInstance(OutputManager)
    this.debug.disable()
  }

  reset() {
    this.colors.enabled = true
    this.stdout.enable()
    this.stderr.enable()
    this.debug.disable()
    return this
  }

  outputDebug(fn: () => Any) {
    if (this.debug.isEnabled) console.debug(fn())
    else this.debugMsgQueue.push(fn)
  }

  drainDebugMessageQueue() {
    this.debugMsgQueue.forEach((fn) => console.debug(fn()))
    this.debugMsgQueue.splice(0, this.debugMsgQueue.length)
  }
}

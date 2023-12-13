import colors from 'ansi-colors'
import type { Any } from '../util/types/Any'
import { MethodDisabler } from '../util/function/MethodDisabler'

/**
 * The OutputManager class manages the output of debug messages to the console.
 */
export class OutputManager {
  /**
   * The singleton instance of the OutputManager class.
   */
  private static instance: OutputManager

  /**
   * Returns the singleton instance of the OutputManager class.
   * If the instance does not exist, it creates a new one.
   */
  static getInstance() {
    if (!this.instance) this.instance = new OutputManager()
    return this.instance
  }

  /**
   * Ansi-colors object
   */
  readonly colors = colors

  /**
   * A MethodDisabler instance for disabling the write method of the process.stdout object.
   */
  readonly stdout = new MethodDisabler(process.stdout, 'write')

  /**
   * A MethodDisabler instance for disabling the write method of the process.stderr object.
   */
  readonly stderr = new MethodDisabler(process.stderr, 'write')

  /**
   * A MethodDisabler instance for disabling the debug method of the console object.
   */
  readonly debug = new MethodDisabler(console, 'debug')

  /**
   * An array that holds queued debug messages.
   */
  protected readonly debugMsgQueue: (() => Any)[] = []

  /**
   * Constructs a new instance of the OutputManager class.
   * console.debug is disabled by default.
   */
  constructor() {
    this.debug.disable()
    colors.enabled = (() => {
      const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env
      return (
        !NODE_DISABLE_COLORS &&
        NO_COLOR == null &&
        TERM !== 'dumb' &&
        ((FORCE_COLOR != null && FORCE_COLOR !== '0') || (process.stdout && process.stdout.isTTY))
      )
    })()
  }

  get queueSize() {
    return this.debugMsgQueue.length
  }

  /**
   * Resets the OutputManager to its default state.
   * - Enables colors.
   * - Enables the write method of the process.stdout object.
   * - Enables the write method of the process.stderr object.
   * - Disables the debug method of the console object.
   * @returns The OutputManager instance.
   */
  reset() {
    this.colors.enabled = true
    this.stdout.enable()
    this.stderr.enable()
    this.debug.disable()
    return this
  }

  /**
   * Outputs a debug message to the console.
   * If the debug method is enabled, the message is immediately logged to the console.
   * Otherwise, the message is added to the debug message queue.
   * @param fn - A function that returns the debug message.
   */
  outputDebug(fn: () => Any) {
    if (this.debug.isEnabled) console.debug(fn())
    else this.debugMsgQueue.push(fn)
  }

  /**
   * Drains the debug message queue by logging all the messages to the console.
   */
  drainDebugMessageQueue() {
    this.debugMsgQueue.forEach((fn) => console.debug(fn()))
    this.debugMsgQueue.splice(0, this.debugMsgQueue.length)
  }
}

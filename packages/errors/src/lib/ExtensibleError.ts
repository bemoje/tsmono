import { isPlainObject, isPrimitive } from '@bemoje/validation'
import { blackBright, bold, red, yellow } from 'cli-color'
import path from 'path'
import type { IParsedErrorFrame } from './IParsedErrorFrame'
import { parseError } from './parseError'

/**
 * An extensible error class inheritance base.
 *
 * Features:
 * - The constructor parses the stack trace.
 * - Pretty print for the terminal, see the toString method.
 * - JSON serialized object with parsed stack trace.
 */
export class ExtensibleError extends Error {
  /**
   * The name of the class constructor
   */
  type: string

  /**
   * Additional information about the cause of the error.
   */
  override cause?: unknown

  /**
   * Parsed stack trace.
   */
  frames: IParsedErrorFrame[]

  /**
   * Returns a new ExtensibleError instance.
   * @param message The error message.
   * @param cause The cause of the error (optional)
   */
  constructor(message: string, cause?: unknown) {
    super(message)
    const parsed = parseError(this)
    this.type = parsed.type
    Object.defineProperty(this, 'message', { enumerable: true, value: parsed.message })
    this.frames = parsed.stack
    if (cause) Object.defineProperty(this, 'cause', { enumerable: true, value: cause })
    Object.defineProperty(this, 'stack', { enumerable: false, value: '' })
  }

  /**
   * Renders the error-message, stack-trace and any other own-properties as a colorful formatted string that is easy to read when printed to in the terminal.
   */
  override toString() {
    // width of the first column = the longest frame.cell string
    const offset = 2 + this.frames.reduce((acc: number, frame) => Math.max(acc, frame.call.length), 0)

    // type and message
    const result = [bold(red(this.type)) + ': ' + ' '.repeat(offset - this.type.length) + red(this.message)]

    // stack trace
    const mapFrames = (frame: IParsedErrorFrame) => {
      let s = '  '
      let fp: string
      if (frame.file.startsWith('node:')) {
        s += blackBright(frame.call)
        fp = blackBright(frame.file)
      } else if (frame.file.includes('node_modules')) {
        s += frame.call
        const base = path.basename(frame.file.split(':')[0])
        fp = frame.file.replace(base, yellow(base))
      } else {
        s += frame.call
        const base = path.basename(frame.file.split(':')[0])
        fp = frame.file.replace(base, red(base))
      }
      s += ' '.repeat(offset - frame.call.length)
      s += fp
      return s
    }
    result.push(yellow('stack') + ':', this.frames.map(mapFrames).join('\n'))

    // other properties
    function jsonLineMapper(line: string) {
      const arr = line.split('": ')
      arr[0] = blackBright(arr[0].replace('"', ''))
      return arr.join(': ')
    }
    const ignored = new Set(['type', 'message', 'frames', 'stack'])
    for (const k of Object.getOwnPropertyNames(this).filter((key) => !ignored.has(key))) {
      const key = k as keyof this
      let s = yellow(key) + ': '
      if (isPlainObject(this[key])) {
        const json = JSON.stringify(this[key], null, 2)
        if (json.length < 350) {
          s += JSON.stringify(this[key], null, 2).split('\n').map(jsonLineMapper).join('\n')
        } else {
          s += JSON.stringify(this[key])
        }
      } else if (isPrimitive(this[key])) {
        s += String(this[key])
      } else if (this[key] != null && typeof this[key] === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        s += (this[key] as any).toString()
      } else {
        s += JSON.stringify(this[key])
      }
      result.push(s.trim())
    }

    return result.join('\n')
  }

  /**
   * Returns the same as toString.
   * @see ExtensibleError.prototype.toString
   */
  override valueOf() {
    return this.toString()
  }

  /**
   * Returns the object with parsed stack trace, ready to be serialized.
   */
  toJSON() {
    return {
      type: this.type,
      message: this.message,
      cause: this.cause,
      stack: this.frames,
    }
  }
}

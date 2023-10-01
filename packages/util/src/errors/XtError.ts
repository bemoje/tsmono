import path from 'path'
import colors from '../node/colors'
import { setNonEnumerable } from '../object/setNonEnumerable'
import { isPlainObject } from '../validation/isPlainObject'
import { isPrimitive } from '../validation/isPrimitive'
import { parseNodeStackTrace } from './parseNodeStackTrace'
const { bold, gray, red, yellow } = colors

/**
 * Wrap an error as an XtError instance.
 *
 * Features:
 * - Parsed stack trace on 'frames' property.
 * - Colorized pretty print for the terminal, incl. any unknown properties, lazily rendered when the 'stack' property is accessed.
 * - JSON serialized object with parsed stack trace and other properties, only without the stack trace string.
 */
export class XtError extends Error {
  /**
   * Parsed stack trace.
   */
  frames: [string, string][] = []

  /**
   * Returns a new instance.
   * @param error The error or error message.
   */
  constructor(error: string | Error | unknown) {
    const isErr = error instanceof Error
    const isXtErr = error instanceof XtError
    super(isErr ? (error as Error).message : error ? error.toString() : String(error))
    if (isXtErr) Object.assign(this, error)
    this.name = this.constructor.name
    const stack = isErr ? (isXtErr ? this.stack : error.stack) : this.stack
    this.frames = parseNodeStackTrace(stack || '')
    Object.defineProperty(this, 'stack', {
      get() {
        return this.prettyStack()
      },
    })
    // make all keys non-enum as to not have them show up twice when printetd to terminal.
    setNonEnumerable(this, ...Object.keys(this))
  }

  protected prettyStack(): string {
    // width of the first column = the longest frame.cell string
    const offset = 2 + this.frames.reduce((acc: number, frame) => Math.max(acc, frame[0].length), 0)

    // type and message
    const result = [
      bold(red(this.name)) + ': ' + ' '.repeat(Math.max(0, offset - this.name.length)) + red(this.message),
    ]

    // stack trace
    result.push(yellow('stack') + ':')
    result.push(
      this.frames
        .map((frame: [string, string]) => {
          const [call, file] = frame
          let s = '  '
          let fp: string
          if (file.startsWith('node:')) {
            s += gray(call)
            fp = gray(file)
          } else if (file.includes('node_modules')) {
            s += call
            const base = path.basename(file.split(':')[0])
            fp = file.replace(base, yellow(base))
          } else {
            s += call
            const base = path.basename(file.split(':')[0])
            fp = file.replace(base, red(base))
          }
          s += ' '.repeat(offset - call.length)
          s += fp
          return s
        })
        .join('\n')
    )

    // other properties
    const ignore = ['name', 'message', 'frames', 'stack']
    const keys = Object.getOwnPropertyNames(this).filter((key) => !ignore.includes(key))
    for (const k of keys) {
      if (typeof k === 'symbol') continue
      const key = k as keyof typeof this
      let s = yellow(key.toString()) + ': '
      if (isPlainObject(this[key])) {
        const json = JSON.stringify(this[key], null, 2)
        if (json.length < 350) {
          s += JSON.stringify(this[key], null, 2)
            .split('\n')
            .map((line: string) => {
              const arr = line.split('": ')
              arr[0] = gray(arr[0].replace('"', ''))
              return arr.join(': ')
            })
            .join('\n')
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
    return '\n' + result.join('\n') + '\n'
  }

  toJSON() {
    const own = Object.getOwnPropertyNames(this).filter((key) => typeof key === 'string')
    const keys = new Set(['name', 'message', 'frames', ...own])
    keys.delete('stack')
    const entries = Array.from(keys)
      .filter((key) => this[key as keyof this] !== undefined)
      .map((key) => [key, this[key as keyof this]])
    return Object.fromEntries(entries)
  }

  /**
   * Renders the error-message, stack-trace and any other own-properties as a colorful formatted string that is easy to read when printed to in the terminal.
   */
  override toString() {
    return this.stack
  }

  /**
   * Returns the same as toString.
   * @see XtError.prototype.toString
   */
  override valueOf() {
    return this.stack
  }
}

import { setNonEnumerable } from '@bemoje/util'
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
   * Parsed stack trace.
   */
  frames: IParsedErrorFrame[]

  #keys: string[]

  /**
   * Returns a new ExtensibleError instance.
   * @param message The error message.
   * @param cause The cause of the error (optional)
   */
  constructor(...args: any[]) {
    const [message, cause] = args
    super(message, cause ? { cause } : {})
    const parsed = parseError(this)
    this.stack = parsed.stack
    this.frames = parsed.frames
    // make all keys non-enum as to not have them show up twice when printetd to terminal.
    this.#keys = Object.keys(this)
    setNonEnumerable(this, ...this.#keys)
  }

  toJSON() {
    const keys = new Set(['name', 'message', 'cause', 'frames', ...this.#keys])
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
   * @see ExtensibleError.prototype.toString
   */
  override valueOf() {
    return this.toString()
  }
}

throw new ExtensibleError('foo asdsd')

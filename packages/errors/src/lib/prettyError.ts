import { ExtensibleError } from './ExtensibleError'
import { parseError } from './parseError'

/**
 * Renders the error-message, stack-trace and any other own-properties as a colorful formatted string that is easy to read when printed to in the terminal.
 * @param error - The error to be converted to a string. This can be of any type.
 */
export function prettyError(error: unknown): string {
  if (error instanceof ExtensibleError) {
    return error.toString()
  }
  if (error instanceof Error) {
    const parsed = parseError(error)
    Reflect.set(error, 'type', parsed.type)
    Reflect.set(error, 'message', parsed.message)
    Reflect.set(error, 'frames', parsed.stack)
    return ExtensibleError.prototype.toString.call(error)
  }
  return String(error)
}

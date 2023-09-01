import { ExtensibleError } from './ExtensibleError'
import { parseError } from './parseError'

export function prettyError(error: unknown): string {
  if (error instanceof ExtensibleError) {
    return error.toString()
  }
  if (error instanceof Error) {
    const parsed = parseError(error)
    Reflect.set(error, 'message', parsed.message)
    Reflect.set(error, 'frames', parsed.stack)
    return ExtensibleError.prototype.toString.call(error)
  }
  return String(error)
}

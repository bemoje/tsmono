import { regexEscapeString } from '@bemoje/string'
import path from 'path'
import * as stackTraceParser from 'stacktrace-parser'
import { IParsedErrorResult } from './IParsedErrorResult'

/**
 * Parses an error into a more readable and useful format.
 * @param error - The error to parse.
 */
export function parseError(error: Error): IParsedErrorResult {
  const recwd = new RegExp('^' + regexEscapeString(process.cwd() + path.sep), 'i')
  const parsed: IParsedErrorResult = {
    type: Object.getPrototypeOf(error).constructor.name,
    message: error.message,
    stack: stackTraceParser.parse(error.stack || '').map((frame) => {
      return {
        file: `${(frame.file || '').replace(recwd, '').replace(/\\\\?/g, '/')}:${frame.lineNumber}:${frame.column}`,
        call: frame.methodName + (frame.arguments.length ? `(${frame.arguments.join(', ')})` : ''),
      }
    }),
  }
  if (error.cause) parsed.cause = error.cause
  return parsed
}

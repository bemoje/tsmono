import path from 'path'
import * as stackTraceParser from 'stacktrace-parser'
import { IParseErrorResult } from './types/IParseErrorResult'

export function parseError(error: Error): IParseErrorResult {
  const recwd = new RegExp('^' + regexEscapeString(process.cwd() + path.sep), 'i')
  const parsed: IParseErrorResult = {
    message: Object.getPrototypeOf(error).constructor.name + ': ' + error.message,
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

function regexEscapeString(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

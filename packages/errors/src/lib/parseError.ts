import { regexEscapeString } from '@bemoje/string'
import { isPlainObject, isPrimitive } from '@bemoje/validation'
import { blackBright, bold, red, yellow } from 'cli-color'
import path from 'path'
import * as stackTraceParser from 'stacktrace-parser'
import type { IParsedErrorFrame } from './IParsedErrorFrame'
import { IParsedErrorResult } from './IParsedErrorResult'

/**
 * Parses an error into a more readable and useful format.
 * @param error - The error to parse.
 */
export function parseError(error: Error, noStackTraceColors = false): IParsedErrorResult {
  // parse stack trace
  const recwd = new RegExp('^' + regexEscapeString(process.cwd() + path.sep), 'i')
  const frames = stackTraceParser.parse(error.stack || '').map((frame) => {
    return {
      file: `${(frame.file || '').replace(recwd, '').replace(/\\\\?/g, '/')}:${frame.lineNumber}:${frame.column}`,
      call: frame.methodName + (frame.arguments.length ? `(${frame.arguments.join(', ')})` : ''),
    }
  })

  // render stack trace
  const c = {
    bold: noStackTraceColors ? (s: string) => s : bold,
    red: noStackTraceColors ? (s: string) => s : red,
    yellow: noStackTraceColors ? (s: string) => s : yellow,
    blackBright: noStackTraceColors ? (s: string) => s : blackBright,
  }

  // width of the first column = the longest frame.cell string
  const offset = 2 + frames.reduce((acc: number, frame) => Math.max(acc, frame.call.length), 0)

  // type and message
  const result = [c.bold(c.red(error.name)) + ': ' + ' '.repeat(offset - error.name.length) + c.red(error.message)]

  // stack trace
  const mapFrames = (frame: IParsedErrorFrame) => {
    let s = '  '
    let fp: string
    if (frame.file.startsWith('node:')) {
      s += c.blackBright(frame.call)
      fp = c.blackBright(frame.file)
    } else if (frame.file.includes('node_modules')) {
      s += frame.call
      const base = path.basename(frame.file.split(':')[0])
      fp = frame.file.replace(base, c.yellow(base))
    } else {
      s += frame.call
      const base = path.basename(frame.file.split(':')[0])
      fp = frame.file.replace(base, c.red(base))
    }
    s += ' '.repeat(offset - frame.call.length)
    s += fp
    return s
  }
  result.push(c.yellow('stack') + ':', frames.map(mapFrames).join('\n'))

  // other properties
  function jsonLineMapper(line: string) {
    const arr = line.split('": ')
    arr[0] = c.blackBright(arr[0].replace('"', ''))
    return arr.join(': ')
  }
  const ignore = ['name', 'message', 'frames', 'stack']
  const keys = Object.getOwnPropertyNames(error).filter((key) => !ignore.includes(key))
  for (const k of keys) {
    if (typeof k === 'symbol') continue
    const key = k as keyof typeof error
    let s = c.yellow(key.toString()) + ': '
    if (isPlainObject(error[key])) {
      const json = JSON.stringify(error[key], null, 2)
      if (json.length < 350) {
        s += JSON.stringify(error[key], null, 2).split('\n').map(jsonLineMapper).join('\n')
      } else {
        s += JSON.stringify(error[key])
      }
    } else if (isPrimitive(error[key])) {
      s += String(error[key])
    } else if (error[key] != null && typeof error[key] === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      s += (error[key] as any).toString()
    } else {
      s += JSON.stringify(error[key])
    }
    result.push(s.trim())
  }
  const stack = result.join('\n')

  // return parsed error
  const parsed: IParsedErrorResult = {
    frames,
    stack,
  }

  return parsed
}

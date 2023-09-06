import path from 'path'
import colors from '../node/colors'
import { regexEscapeString } from '../string/regex/regexEscapeString'
import { isPlainObject } from '../validation/isPlainObject'
import { isPrimitive } from '../validation/isPrimitive'
import type { IParsedErrorFrame } from './IParsedErrorFrame'
import { IParsedErrorResult } from './IParsedErrorResult'
const { bold, gray, red, yellow } = colors

/**
 * Parses an error (nodejs) into a more readable and useful format.
 * @param error - The error to parse.
 */
export function parseError(error: Error, noStackTraceColors = false): IParsedErrorResult {
  const nodeRe = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i
  const recwd = new RegExp('^' + regexEscapeString(process.cwd() + path.sep), 'i')
  const frames = []
  for (const line of (error.stack || '').split('\n')) {
    const parts = nodeRe.exec(line)
    if (!parts) continue
    frames.push({
      file: `${(parts[2] || '').replace(recwd, '').replace(/\\\\?/g, '/')}:${+parts[3]}:${parts[4] ? +parts[4] : null}`,
      call: parts[1] || '<unknown>',
    })
  }

  // render stack trace
  const c = {
    bold: noStackTraceColors ? (s: string) => s : bold,
    red: noStackTraceColors ? (s: string) => s : red,
    yellow: noStackTraceColors ? (s: string) => s : yellow,
    gray: noStackTraceColors ? (s: string) => s : gray,
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
      s += c.gray(frame.call)
      fp = c.gray(frame.file)
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
    arr[0] = c.gray(arr[0].replace('"', ''))
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

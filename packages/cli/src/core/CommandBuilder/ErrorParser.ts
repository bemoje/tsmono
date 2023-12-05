import path from 'path'
import { colors, isPlainObject, isPrimitive, regexEscapeString } from '@bemoje/util'

export class ErrorParser {
  readonly error: Error

  constructor(error: unknown) {
    this.error = error instanceof Error ? error : new Error(String(error))
  }

  get name() {
    return this.error.name
  }

  get message() {
    return this.error.message
  }

  get stack(): string {
    return this.error.stack || ''
  }

  summary() {
    return this.name + ': ' + this.message
  }

  parseStackFrames() {
    return errParseStack(this.stack)
  }

  prettyStack(parsedStackFrames?: [string, string][]) {
    return errPrettyStack(this.error, parsedStackFrames)
  }

  toObject() {
    return errToObject(this.error)
  }

  toJSON() {
    return this.toObject()
  }
}

export function errPrettyStack(error: Error, parsedStackFrames?: [string, string][]) {
  const frames = parsedStackFrames ?? errParseStack(error.stack || '')

  // width of the first column = the longest frame.cell string
  const offset = 2 + frames.reduce((acc: number, frame) => Math.max(acc, frame[0].length), 0)

  // type and message
  const result = [
    colors.bold(colors.red(error.name)) +
      ': ' +
      ' '.repeat(Math.max(0, offset - error.name.length)) +
      colors.red(error.message),
  ]

  // stack trace
  result.push(colors.yellow('stack') + ':')
  result.push(
    frames
      .map((frame: [string, string]) => {
        const [call, file] = frame
        let s = '  '
        let fp: string
        if (file.startsWith('node:')) {
          s += colors.gray(call)
          fp = colors.gray(file)
        } else if (file.includes('node_modules')) {
          s += call
          const base = path.basename(file.split(':')[0])
          fp = file.replace(base, colors.yellow(base))
        } else {
          s += call
          const base = path.basename(file.split(':')[0])
          fp = file.replace(base, colors.red(base))
        }
        s += ' '.repeat(offset - call.length)
        s += fp
        return s
      })
      .join('\n')
  )

  // other properties
  const ignore = ['name', 'message', 'frames', 'stack']
  const keys = Object.getOwnPropertyNames(error).filter((key) => !ignore.includes(key))
  for (const k of keys) {
    if (typeof k === 'symbol') continue
    const key = k as keyof typeof error
    let s = colors.yellow(key.toString()) + ': '
    if (isPlainObject(error[key])) {
      const json = JSON.stringify(error[key], null, 2)
      if (json.length < 350) {
        s += JSON.stringify(error[key], null, 2)
          .split('\n')
          .map((line: string) => {
            const arr = line.split('": ')
            arr[0] = colors.gray(arr[0].replace('"', ''))
            return arr.join(': ')
          })
          .join('\n')
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
  return '\n' + result.join('\n') + '\n'
}

export function errParseStack(stack: string): [string, string][] {
  if (!stack) return []
  const nodeRe = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i
  const recwd = new RegExp('^' + regexEscapeString(process.cwd() + path.sep), 'i')
  const frames: [string, string][] = []
  for (const line of stack.split('\n')) {
    const parts = nodeRe.exec(line)
    if (!parts) continue
    frames.push([
      parts[1] || '<unknown>',
      `${(parts[2] || '').replace(recwd, '').replace(/\\\\?/g, '/')}:${+parts[3]}:${parts[4] ? +parts[4] : null}`,
    ])
  }
  return frames
}

export function errToObject(error: Error) {
  const own = Object.getOwnPropertyNames(error).filter((key) => typeof key === 'string')
  const keys = new Set(['name', 'message', 'frames', ...own])
  keys.delete('stack')
  const entries = Array.from(keys)
    .filter((key) => error[key as keyof Error] !== undefined)
    .map((key) => [key, error[key as keyof Error]])
  return Object.fromEntries(entries)
}

// try {
//   throw new TypeError('wow ok oops')
// } catch (error) {
//   const err = new ErrorParser(error)
//   console.log('----------------------')
//   console.log({
//     name: err.name,
//     message: err.message,
//     summary: err.summary,
//   })
//   console.log('----------------------')
//   console.log(err.stack)
//   console.log('----------------------')
//   console.log(err.prettyStack())
//   console.log('----------------------')
//   console.log(err.toObject())
//   console.log('----------------------')
// }

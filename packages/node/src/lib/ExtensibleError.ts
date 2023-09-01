import { blackBright, bold, red, yellow } from 'cli-color'
import path from 'path'
import { parseError } from './parseError'
import { IParseErrorFrame } from './types/IParseErrorFrame'

export class ExtensibleError extends Error {
  frames: IParseErrorFrame[]
  cause?: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    const parsed = parseError(this)
    Object.defineProperty(this, 'message', { enumerable: true, value: parsed.message })
    this.frames = parsed.stack
    if (cause) {
      Object.defineProperty(this, 'cause', { enumerable: true, value: cause })
    }
    Object.defineProperty(this, 'stack', { enumerable: false, value: '' })
  }

  override toString() {
    const offset = 2 + this.frames.reduce((acc: number, frame) => Math.max(acc, frame.call.length), 0)

    const [t, msg] = this.message.split(': ')
    const result = [bold(red(t)) + ': ' + ' '.repeat(offset - t.length) + red(msg)]

    result.push(yellow('Stack') + ':')
    result.push(
      this.frames
        .map((frame) => {
          let s = '  '
          let file = ''
          if (frame.file.startsWith('node:')) {
            s += blackBright(frame.call)
            file = blackBright(frame.file)
          } else if (frame.file.includes('node_modules')) {
            s += frame.call
            const fpath = frame.file.split(':')[0]
            const p = path.parse(fpath)
            file = frame.file.replace(p.base, yellow(p.base))
          } else {
            s += frame.call
            const fpath = frame.file.split(':')[0]
            const p = path.parse(fpath)
            file = frame.file.replace(p.base, red(p.base))
          }
          s += ' '.repeat(offset - frame.call.length)
          s += file
          return s
        })
        .join('\n'),
    )

    if (this.cause) {
      let str = yellow('Cause') + ': '
      if (isPrimitive(this.cause)) {
        str += String(this.cause)
      } else {
        str += JSON.stringify(this.cause, null, 2)
          .split('\n')
          .map((l) => {
            const a = l.split('": ')
            a[0] = blackBright(a[0].replace('"', ''))
            return a.join(': ')
          })
          .join('\n')
      }
      result.push(str)
    }

    return result.join('\n')
  }

  valueOf() {
    return this.toString()
  }

  toJSON() {
    const [type, message] = this.message.split(': ')
    return {
      type,
      message,
      stack: this.frames,
      cause: this.cause,
    }
  }
}

function isPrimitive(value: unknown): value is null | undefined | bigint | boolean | number | string | symbol {
  return (typeof value !== 'object' && typeof value !== 'function') || value === null
}

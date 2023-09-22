import path from 'path'
import { regexEscapeString } from '../regex/regexEscapeString'

export function parseNodeStackTrace(stack: string): [string, string][] {
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

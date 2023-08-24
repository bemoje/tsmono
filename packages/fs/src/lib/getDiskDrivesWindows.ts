import { execSync } from 'child_process'
import path from 'path'
import { isWindows } from './isWindows'

export function getDiskDrivesWindows(): string[] {
  if (!isWindows()) throw new Error('This function is only available on Windows.')
  return execSync('wmic logicaldisk get name')
    .toString()
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => /^[a-z]:/i.test(s))
    .map((s) => s.substring(0, 2) + path.sep)
}

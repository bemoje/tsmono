import { execSync } from 'child_process'

export function getDiskDrivesWindows(): string[] {
  if (!process.platform.includes('win')) {
    throw new Error('This function is only available on Windows.')
  }
  return execSync('wmic logicaldisk get name')
    .toString()
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length === 2)
    .map((s) => (s.endsWith('/') ? s : s + '/'))
}

import { execSync } from 'child_process'

/**
 * Returns whether Visual Studio Code is installed on the system.
 * @example isVsCodeInstalled() //=> true
 */
export function isVsCodeInstalled(): boolean {
  try {
    const stdout = execSync('code --help').toString()
    return stdout.startsWith('Visual Studio Code') && stdout.includes('-w --wait')
  } catch (e) {
    return false
  }
}

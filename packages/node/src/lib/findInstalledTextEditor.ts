import { execSync } from 'child_process'

export function isVsCodeInstalled() {
  try {
    const stdout = execSync('code --help').toString()
    return stdout.startsWith('Visual Studio Code') && stdout.includes('-w --wait')
  } catch (e) {
    return false
  }
}

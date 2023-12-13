import { execSync } from 'child_process'

export function execInherit(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const buffer = execSync(command, { stdio: 'inherit' })
      const string = buffer && buffer.toString ? buffer.toString().trim() : ''
      resolve(string)
    } catch (error) {
      const oError = error instanceof Error ? error : new Error(String(error))
      reject(oError)
    }
  })
}

import { execSync } from 'child_process'
import path from 'path'

export function forOne(name: string, args: string[]) {
  const command = args.join(' ')
  console.log({ package: name, command })
  const rootdir = path.join(process.cwd(), 'packages', name)
  execSync(command, { stdio: 'inherit', cwd: rootdir })
}

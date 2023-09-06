import { spawn } from 'child_process'

/**
 * @param command - The program to execute.
 * @param args - The arguments to pass to the program.
 */
export function shellSpawnProgram(command: string, ...args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    let child

    const noInherit = args.indexOf('--no-inherit')
    if (noInherit !== -1) {
      args.splice(noInherit, 1)
      child = spawn(command, args)
    } else {
      child = spawn(command, args, { stdio: 'inherit' })
    }

    child.on('error', (error) => {
      reject(error)
    })

    child.on('close', (code) => {
      resolve(command + ' ' + args.join(' '))
    })
  })
}

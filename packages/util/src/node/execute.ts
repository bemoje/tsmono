import { execSync } from 'child_process'
import path from 'path'
import { absoluteToRelativePath } from '../fs/absoluteToRelativePath'
import colors from './colors'
import { IExecuteCommandOptions } from './types/IExecuteCommandOptions'
const { magenta, dim, bold, green } = colors

/**
 * Execute one or multiple shell commands.
 * @param commands - The command(s) to execute.
 * @param options - @see IExecuteCommandOptions
 */
export function execute(commands: string[] | string, options: IExecuteCommandOptions = {}): string {
  if (Array.isArray(commands)) {
    const out = []
    for (const command of commands) {
      out.push(execute(command, options))
    }
    return out.join('\n-------------------------------\n')
  }

  const command: string = commands
  const cwd = options.cwd ?? process.cwd()
  const silent = options.silent ?? false
  const directOutput = options.directOutput ?? false
  const noEcho = options.noEcho ?? false

  if (!noEcho) {
    let relative = absoluteToRelativePath(cwd)
    if (directOutput) {
      console.log(`Running ${command} in ${relative}`)
    } else {
      relative = absoluteToRelativePath(cwd)
        .replace(/\\/g, '/')
        .replace(path.basename(cwd), bold(magenta(path.basename(cwd))))
      console.log(`Running ${green(command)} in ${bold(magenta(relative))}`)
    }
  }

  const buffer = execSync(command, { stdio: silent ? 'ignore' : directOutput ? 'inherit' : 'pipe', cwd })
  const string = buffer.toString ? buffer.toString().trim() : ''
  if (!silent) {
    const out = string
      .split(/\r*\n/)
      .filter((line) => directOutput || line.trim())
      .map((line) => (directOutput ? line : dim('- ' + line).trim()))
      .join('\n')
      .trim()
    if (out) {
      console.log(out)
      console.log()
    }
  }
  return string
}

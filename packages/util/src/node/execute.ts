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
  const fadedOutput = options.fadedOutput ?? false
  const noEcho = options.noEcho ?? false

  if (!noEcho) {
    const relative = absoluteToRelativePath(cwd)
      .replace(/\\/g, '/')
      .replace(path.basename(cwd), bold(magenta(path.basename(cwd))))
    const out = `${green(command)}${cwd === process.cwd() ? '' : ' in ' + bold(magenta(relative))}`
    console.log(silent && fadedOutput ? '  ' + dim(out) : out)
  }

  const buffer = execSync(command, { stdio: silent || fadedOutput ? 'pipe' : 'inherit', cwd })
  const string = buffer && buffer.toString ? buffer.toString().trim() : ''
  if (!silent) {
    const out = string
      .split(/\r*\n/)
      .filter((line) => !fadedOutput || line.trim())
      .map((line) => (fadedOutput ? dim('- ' + line).trim() : line))
      .join('\n')
      .trim()
    if (out) {
      console.log(out)
    }
  }
  return string
}

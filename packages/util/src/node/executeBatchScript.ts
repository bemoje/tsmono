import { execFileSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'
import { XtError } from '../errors/XtError'
import { colors } from './colors'
import { IExecuteBatchScriptOptions } from './types/IExecuteBatchScriptOptions'
import { IExecuteBatchScriptResult } from './types/IExecuteBatchScriptResult'
const { magenta } = colors

/**
 * Provide a virtual batch script in the form of a string array that represent the lines of the script.
 *
 * @remarks
 * - It works by writing the sctipt to a temporary file, (synchronously) executing and then deleting the file.
 * - Errors, stdout and stderr are returned after execution has terminated.
 * - Batch scripts are only compatible with Windows systems.
 *
 * @param cmds The commands to execute.
 * @returns The stdout of the batch script.
 * @throws Will throw an error if no temporary directory could be found or is provided.
 *
 * @example
 * executeBatchScript(['ping google.com'])
 * returns: {
 *   stdout: [
 *     'Pinging google.com [142.250.74.78] with 32 bytes of data:',
 *     'Reply from 142.250.74.78: bytes=32 time=18ms TTL=55',
 *     'Reply from (...)'
 *   ],
 *   stderr: [],
 *   error: undefined,
 * }
 *
 * @example
 * executeBatchScript(['ping google.comm'])
 * returns: {
 *   stdout: ['Ping request could not find host google.comm. Please check the name and try again.'],
 *   stderr: [],
 *   error: 'Error: Command failed (...)',
 * }
 */
export function executeBatchScript(
  cmds: string[],
  options: IExecuteBatchScriptOptions = {}
): IExecuteBatchScriptResult {
  // return empty result if no commands
  if (!cmds.length) return { stdout: [], stderr: [], error: undefined }

  // options
  const opt = Object.assign({}, defaults, options)

  // render script
  const script: string[] = []
  if (!opt.echo) script.push('@echo off')
  script.push(`cd ${opt.cwd}`)
  if (opt.prependWithCall) {
    script.push(...cmds.map((s) => 'call ' + s))
  } else {
    script.push(...cmds)
  }

  if (!opt.silent && opt.echo) {
    console.log(
      'Running Batch: \n' +
        magenta(
          script
            .slice(1)
            .map((l) => '  ' + l)
            .join('\n')
        ) +
        '\n'
    )
  }

  // write script to temporary file
  if (!opt.tempdir) throw new Error('Could neither find tempdir option, nor the TEMP or TMP environment variables.')
  const tempsubdir = path.join(opt.tempdir, 'executeBatchScript')
  fs.mkdirSync(tempsubdir, { recursive: true })
  const tempfile = path.join(tempsubdir, Date.now() + '.bat')
  fs.writeFileSync(tempfile, script.join('\n'), 'utf8')

  // clean terminal output
  const cleanOutput = (string: string): string[] => {
    return string
      .trim()
      .split(/\r*\n/)
      .filter((line: string) => !!line)
  }

  // execute script
  const stdout: string[] = []
  const stderr: string[] = []
  let error: unknown
  try {
    const rv = execFileSync(tempfile, opt.silent ? { stdio: 'ignore' } : { stdio: 'inherit' })
    if (rv) stdout.push(...cleanOutput(rv.toString()))
  } catch (err: unknown) {
    error = new XtError(err)
    if (!opt.silent) console.error(error)
    if (typeof err === 'object' && err !== null) {
      stdout.push(...cleanOutput((Reflect.get(err, 'stdout') ?? '').toString()))
      stderr.push(...cleanOutput((Reflect.get(err, 'stderr') ?? '').toString()))
    }
  }

  // delete temp file and return result
  if (fs.existsSync(tempfile)) fs.rmSync(tempfile, { force: true })
  return { stdout, stderr, error }
}

/**
 * The default optionsfor the `executeBatchScript` function.
 */
const defaults: Required<IExecuteBatchScriptOptions> = {
  silent: false,
  echo: false,
  prependWithCall: false,
  cwd: process.cwd(),
  tempdir:
    process.env['TEMP'] ||
    process.env['TMP'] ||
    process.env['TMPDIR'] ||
    path.join(path.parse(process.cwd()).root, 'temp'),
}

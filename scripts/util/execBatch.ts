import { execFileSync } from 'child_process'
import { magenta } from 'cli-color'
import * as fs from 'fs'
import path from 'path'

export function execBatch(cmds: string[], onError?: () => void) {
  _execBatch(false, cmds, onError)
}

export function execBatchSilently(cmds: string[], onError?: () => void) {
  _execBatch(true, cmds, onError)
}

function _execBatch(silent: boolean, cmds: string[], onError?: () => void) {
  if (!cmds.length) return
  const bat: string[] = [`call cd ${process.cwd()}`, ...cmds.map((s) => 'call ' + s)]
  console.log(
    '\n' +
      magenta(
        bat
          .slice(1)
          .map((l) => l.replace('call ', ''))
          .join('\n'),
      ) +
      '\n',
  )
  const tempdir = process.env['TEMP'] || process.env['TMP']
  if (!tempdir) throw new Error('Could not find TEMP or TMP environment variable.')
  const tempfile = path.join(tempdir, Date.now() + '.bat')
  fs.writeFileSync(tempfile, bat.join('\n'), 'utf8')
  try {
    if (silent) execFileSync(tempfile)
    else execFileSync(tempfile, { stdio: 'inherit' })
  } catch (error) {
    if (onError) onError()
    else throw error
  }
  fs.rmSync(tempfile)
}

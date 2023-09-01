import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export function execBatch(cmds: string[]): Buffer {
  if (!cmds.length) return Buffer.from('')
  const bat: string[] = [`call cd ${process.cwd()}`, ...cmds.map((s) => 'call ' + s)]
  const tempdir = process.env['TEMP'] || process.env['TMP']
  if (!tempdir) throw new Error('Could not find TEMP or TMP environment variable.')
  const tempfile = path.join(tempdir, Date.now() + '.bat')
  fs.writeFileSync(tempfile, bat.join('\n'), 'utf8')
  const retval = execFileSync(tempfile)
  fs.rmSync(tempfile)
  return retval
}

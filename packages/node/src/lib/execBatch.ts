import { execFileSync } from 'child_process'
import { cyan } from 'cli-color'
import fs from 'fs'
import path from 'path'

export function execBatch(cmds: string[], onError?: () => void) {
  if (!cmds.length) return
  const bat: string[] = ['@echo off', `call cd ${process.cwd()}`, ...cmds.map((s) => 'call ' + s)]
  console.log(
    cyan(
      bat
        .slice(2)
        .map((l) => l.replace('call ', ''))
        .join('\n'),
    ),
  )
  const tempdir = process.env['TEMP']!
  const tempfile = path.join(tempdir, Date.now() + '.bat')
  fs.writeFileSync(tempfile, bat.join('\n'), 'utf8')
  try {
    execFileSync(tempfile, { stdio: 'inherit' })
  } catch (error) {
    console.log(error)
    if (onError) onError()
  }
  fs.rmSync(tempfile)
}

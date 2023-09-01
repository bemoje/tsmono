import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export function execBatch(cmds: string[], onError?: () => void) {
  // const bat = [`@echo off`, ...cmds.map((s) => 'call ' + s)]
  const bat = [...cmds.map((s) => 'call ' + s)]
  console.log(bat)
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

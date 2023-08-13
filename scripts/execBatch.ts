import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'

export function execBatch(cmds: string[], onError?: () => void) {
  cmds = cmds.map((cmd) => `call ${cmd}`)
  console.log(cmds.join('\n'))
  const bat = [`@echo off`, ...cmds].join('\n')
  const tempdir = process.env['TEMP']!
  const tempfile = path.join(tempdir, Date.now() + '.bat')
  fs.writeFileSync(tempfile, bat, 'utf8')
  try {
    execFileSync(tempfile, { stdio: 'inherit' })
  } catch (error) {
    console.log(error)
    if (onError) onError()
  }
  fs.rmSync(tempfile)
}

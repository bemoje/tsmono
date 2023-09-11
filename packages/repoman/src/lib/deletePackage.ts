import { executeBatchScript } from '@bemoje/util'
import fs from 'fs'
import path from 'path'

export function deletePackage(name: string) {
  if (!name) throw new Error('No name provided')

  const cmds = [`npm uninstall @bemoje/${name}`, `nx g @nrwl/workspace:remove ${name}`]

  try {
    fs.rmSync(path.join(process.cwd(), 'dist', 'packages', name), { recursive: true, force: true })
  } catch (error) {
    //
  }

  executeBatchScript(cmds, {
    cwd: process.cwd(),
    prependWithCall: true,
  })
}

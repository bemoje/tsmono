import fs from 'fs'
import path from 'path'
import { executeBatchScript } from '../../packages/util/src/node/virtual-script/executeBatchScript'

export function deletePackage(args: string[]) {
  const name = args[0]
  if (!name) throw new Error('No name provided')

  const cmds = [`npm uninstall @bemoje/${name}`, `nx g @nrwl/workspace:remove ${name}`]

  try {
    fs.rmSync(path.join(process.cwd(), 'dist', name), { recursive: true, force: true })
  } catch (error) {
    //
  }

  executeBatchScript(cmds, {
    cwd: process.cwd(),
    prependWithCall: true,
  })
}

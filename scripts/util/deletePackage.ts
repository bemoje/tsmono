import { executeBatchScript } from '../../packages/util/src'
import { forEach } from './forEach'

export function deletePackage(args: string[]) {
  const name = args[0]
  if (!name) throw new Error('No name provided')

  forEach([`npm uninstall @bemoje/${name}`])

  const cmds = [`npm uninstall @bemoje/${name}`, `nx g @nrwl/workspace:remove ${name}`]

  executeBatchScript(cmds, {
    cwd: process.cwd(),
  })
}

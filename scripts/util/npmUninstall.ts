import path from 'path'
import { executeBatchScript } from '../../packages/node/src/lib/virtual-script/executeBatchScript'
import { getPackages } from './getPackages'

export function npmUninstall() {
  const uninstall = process.argv.slice(2)
  const target = uninstall.shift()
  if (!target) throw new Error('no target package selected')
  if (!uninstall.length) throw new Error('no packages to install')

  const cwd = process.cwd()
  const rootdir = path.join(cwd, 'packages', target)

  for (const name of uninstall) {
    executeBatchScript([`cd ${rootdir}`, 'npm uninstall ' + name, 'npm uninstall @types/' + name])
    if (getPackages().find(({ pkg }) => !!pkg.dependencies[name])) {
      executeBatchScript([`cd ${cwd}`, 'npm uninstall ' + name, 'npm uninstall @types/' + name])
    }
  }
}

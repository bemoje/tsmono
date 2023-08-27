import path from 'path'
import { execBatch } from '../../packages/node/src/lib/execBatch'
import { getPackages } from './getPackages'

export function npmUninstall() {
  const uninstall = process.argv.slice(2)
  const target = uninstall.shift()
  if (!target) throw new Error('no target package selected')
  if (!uninstall.length) throw new Error('no packages to install')

  const cwd = process.cwd()
  const rootdir = path.join(cwd, 'packages', target)

  for (const name of uninstall) {
    execBatch([`cd ${rootdir}`, 'npm uninstall ' + name, 'npm uninstall @types/' + name])
    if (getPackages().find(({ pkg }) => !!pkg.dependencies[name])) {
      execBatch([`cd ${cwd}`, 'npm uninstall ' + name, 'npm uninstall @types/' + name])
    }
  }
}

import { executeBatchScript } from '../../packages/node/src/lib/virtual-script/executeBatchScript'
import { getPackages } from './getPackages'

export function npmUpdate() {
  const names = process.argv.slice(2)

  if (!names.length) {
    executeBatchScript([`cd ${process.cwd()}`, 'npm update'])
  }

  getPackages().forEach(({ name, rootdir }) => {
    if (names.length && !names.includes(name)) return
    executeBatchScript([`cd ${rootdir}`, 'npm update'])
  })
}

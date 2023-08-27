import { execBatch } from '../../packages/node/src/lib/execBatch'
import { getPackages } from './getPackages'

export function npmUpdate() {
  const names = process.argv.slice(2)

  if (!names.length) {
    execBatch([`cd ${process.cwd()}`, 'npm update'])
  }

  getPackages().forEach(({ name, rootdir }) => {
    if (names.length && !names.includes(name)) return
    execBatch([`cd ${rootdir}`, 'npm update'])
  })
}

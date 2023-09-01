import { execBatch } from '../../packages/node/src/lib/execBatch'
import { getPackages } from './getPackages'

getPackages().forEach(({ name, rootdir }) => {
  execBatch([`cd ${rootdir}`, 'npm update @bemoje/*'])
})

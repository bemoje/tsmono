import { executeBatchScript } from '../../packages/util/src/node/virtual-script/executeBatchScript'
import { getPackages } from './getPackages'

export function forEach(args: string[]) {
  getPackages().forEach(({ rootdir }) => {
    const { error } = executeBatchScript(args, {
      prependWithCall: true,
      cwd: rootdir,
    })
    if (error) throw error
  })
}

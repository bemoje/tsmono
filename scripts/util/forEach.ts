import { executeBatchScript } from '../../packages/node/src/lib/virtual-script/executeBatchScript'
import { getPackages } from './getPackages'

export function forEach(args: string[] = process.argv.slice(2)) {
  getPackages().forEach(({ rootdir }) => {
    const { error } = executeBatchScript(args, {
      prependWithCall: true,
      cwd: rootdir,
    })
    if (error) throw error
  })
}

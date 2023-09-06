import { executeBatchScript } from '../../packages/node/src/lib/virtual-script/executeBatchScript'
import { fixAll } from './fixAll'

export function build(names: string[] = process.argv.slice(2)) {
  fixAll()
  executeBatchScript(['nx run-many -t "build"' + (names.length ? ' -p ' + names.join(',') : '')])
}

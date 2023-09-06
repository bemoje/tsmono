import { executeBatchScript } from '../../packages/node/src/lib/virtual-script/executeBatchScript'

export function test(names: string[] = process.argv.slice(2)) {
  executeBatchScript(['nx run-many -t test' + (names.length ? ' -p ' + names.join(',') : '')])
}

import { executeBatchScript } from '../../packages/util/src/node/executeBatchScript'

export function test(names: string[] = []) {
  executeBatchScript(['nx run-many -t test' + (names.length ? ' -p ' + names.join(',') : '')])
}

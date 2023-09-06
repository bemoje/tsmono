import { executeBatchScript } from '../../packages/util/src'

export function test(names: string[] = []) {
  executeBatchScript(['nx run-many -t test' + (names.length ? ' -p ' + names.join(',') : '')])
}

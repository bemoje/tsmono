import { executeBatchScript } from '@bemoje/util'

export function test(names: string[] = []) {
  executeBatchScript(['nx run-many -t test' + (names.length ? ' -p ' + names.join(',') : '')])
}

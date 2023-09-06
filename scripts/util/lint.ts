import { executeBatchScript } from '../../packages/util/src/node/executeBatchScript'

export function lint(names: string[] = []) {
  executeBatchScript(['nx run-many -t lint' + (names.length ? ' -p ' + names.join(',') : '')])
}

import { executeBatchScript } from '../../packages/util/src/node/virtual-script/executeBatchScript'

export function lint(names: string[] = []) {
  executeBatchScript(['nx run-many -t lint' + (names.length ? ' -p ' + names.join(',') : '')])
}

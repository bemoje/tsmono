import { executeBatchScript } from '../../packages/node/src/lib/virtual-script/executeBatchScript'

export function lint(names: string[] = process.argv.slice(2)) {
  executeBatchScript(['nx run-many -t lint' + (names.length ? ' -p ' + names.join(',') : '')])
}

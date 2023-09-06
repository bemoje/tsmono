import { executeBatchScript } from '@bemoje/util'

export function lint(names: string[] = []) {
  executeBatchScript(['nx run-many -t lint' + (names.length ? ' -p ' + names.join(',') : '')])
}

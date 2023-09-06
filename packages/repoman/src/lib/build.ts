import { executeBatchScript } from '@bemoje/util'
import { fixAll } from './fixAll'

export function build(names?: string[]) {
  fixAll()
  executeBatchScript(['nx run-many -t "build"' + (names ? ' -p ' + names.join(',') : '')])
}

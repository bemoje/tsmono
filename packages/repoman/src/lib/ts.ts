import { executeBatchScript } from '@bemoje/util'
import { fixEntryPoints } from './fixEntryPoints'

export function ts(fpath: string[]) {
  fixEntryPoints()
  executeBatchScript(['ts-node -P tsconfig.json "' + fpath + '"'])
}

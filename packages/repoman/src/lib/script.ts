import { executeBatchScript } from '@bemoje/util'
import { fixEntryPoints } from './fixEntryPoints'

export function script(fpath: string[]) {
  fixEntryPoints()
  executeBatchScript(['ts-node -P tsconfig.scripts.json "' + fpath + '"'])
}

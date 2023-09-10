import { executeBatchScript } from '@bemoje/util'
import { fixEntryPoints } from './fixEntryPoints'

export function script(args: string[]) {
  const fpath = args[0]
  fixEntryPoints()
  executeBatchScript(['ts-node -P tsconfig.scripts.json "' + fpath + '"'])
}

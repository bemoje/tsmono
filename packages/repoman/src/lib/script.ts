import { execute } from '@bemoje/util'
import { fixEntryPoints } from './fixEntryPoints'

export function script(args: string[]) {
  const fpath = args[0]
  fixEntryPoints()
  execute('ts-node -P tsconfig.scripts.json "' + fpath + '"')
}

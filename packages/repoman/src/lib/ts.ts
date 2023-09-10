import { findFile } from '@bemoje/fswalk'
import { executeBatchScript } from '@bemoje/util'
import path from 'path'
import { fixEntryPoints } from './fixEntryPoints'

export async function ts(args: string[]) {
  const [search] = args
  const fpath = await findFile(path.join(process.cwd(), 'packages'), search, {
    filter: (fullpath: string, stat) => {
      if (stat.isDirectory()) {
        if (fullpath.includes('node_modules')) return false
        return true
      }
      return fullpath.endsWith('.ts') && !fullpath.endsWith('test.ts')
    },
  })
  fixEntryPoints()
  executeBatchScript(['ts-node -P tsconfig.json "' + fpath + '"'])
}

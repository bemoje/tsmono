import { findFile } from '@bemoje/fswalk'
import { absoluteToRelativePath } from '@bemoje/util'
import { execSync } from 'child_process'
import path from 'path'

export async function ts(args: string[], options: { script?: boolean } = {}): Promise<void> {
  const search = args.join('/')
  console.log({ search, options })
  const fpath = await findFile(path.join(process.cwd(), options.script ? 'scripts' : 'packages'), search, {
    filter: (fullpath: string, stat) => {
      if (stat.isDirectory()) {
        if (fullpath.includes('node_modules')) return false
        return true
      }
      return fullpath.endsWith('.ts') && !fullpath.endsWith('test.ts')
    },
  })
  if (!fpath) throw new Error('File not found: ' + search)
  const relative = absoluteToRelativePath(fpath).replace(/\\/g, '/')
  console.log({ found: relative })
  const command =
    'node node_modules/ts-node/dist/bin.js -P tsconfig' + (options.script ? '.scripts' : '') + '.json ' + relative
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('Command failed:')) {
      throw error
    }
  }
}

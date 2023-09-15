import { findFile } from '@bemoje/fswalk'
import { absoluteToRelativePath } from '@bemoje/util'
import { execSync } from 'child_process'
import path from 'path'

export async function testfile(args: string[], options: { coverage?: boolean } = {}) {
  const coverage = options.coverage === true
  const search = path.join(...args).replace(/\\/g, '/')
  console.log({ coverage, search })
  const fpath = await findFile(path.join(process.cwd(), 'packages'), search, {
    filter: (fullpath: string, stat) => {
      if (stat.isDirectory()) {
        if (fullpath.includes('node_modules')) return false
        return true
      }
      return fullpath.endsWith('.test.ts') || fullpath.endsWith('.spec.ts')
    },
  })
  if (!fpath) throw new Error('File not found: ' + search)
  const relative = absoluteToRelativePath(fpath).replace(/\\/g, '/')
  const command = 'jest ' + relative + (coverage ? ' --coverage' : '')
  execSync(command, { stdio: 'inherit' })
}

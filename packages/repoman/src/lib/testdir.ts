import { findDirectory } from '@bemoje/fswalk'
import { absoluteToRelativePath } from '@bemoje/util'
import { execSync } from 'child_process'
import path from 'path'

export async function testdir(args: string[], options: { coverage?: boolean } = {}) {
  const coverage = options.coverage === true
  const search = path.join(...args).replace(/\\/g, '/')
  console.log({ coverage, search })
  const dpath = await findDirectory(path.join(process.cwd(), 'packages'), search, {
    filter: (fullpath: string, stat) => {
      if (stat.isDirectory()) {
        if (fullpath.includes('node_modules')) return false
        return true
      }
      return false
    },
  })

  if (!dpath) throw new Error('Test not found: ' + search)
  const relative = absoluteToRelativePath(dpath).replace(/\\/g, '/')
  const command = 'jest ' + relative + (coverage ? ' --coverage' : '')
  execSync(command, { stdio: 'inherit' })
}

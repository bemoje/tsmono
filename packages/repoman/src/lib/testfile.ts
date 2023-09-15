import { findFile } from '@bemoje/fswalk'
import { absoluteToRelativePath } from '@bemoje/util'
import { execSync } from 'child_process'
import path from 'path'

export async function testfile(args: string[], options: { coverage?: boolean; dir?: boolean } = {}) {
  const coverage = options.coverage === true
  const search = path.join(...args).replace(/\\/g, '/')
  console.log({ coverage, search })
  const fpath = await findFile(path.join('packages'), search, {
    filter: (fullpath: string, stat) => {
      return stat.isDirectory() ? !fullpath.includes('node_modules') : fullpath.endsWith('.test.ts')
    },
  })
  if (!fpath) throw new Error('File not found: ' + search)
  const relative = absoluteToRelativePath(options.dir ? path.dirname(fpath) : fpath).replace(/\\/g, '/')
  console.log({ found: path.basename(relative) })
  const covdir = path.join('coverage', 'packages', relative.split('/')[1])
  const command = 'jest ' + relative + ' --coverageDirectory=' + covdir + (coverage ? ' --coverage' : '')
  execSync(command, { stdio: 'inherit' })
}

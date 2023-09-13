import { findDirectory, findFile } from '@bemoje/fswalk'
import { absoluteToRelativePath } from '@bemoje/util'
import { execSync } from 'child_process'
import path from 'path'

export async function ts(args: string[]): Promise<void> {
  console.log({ args })

  const search = args.join('/')
  console.log({ search })
  const fpath = await findFile(path.join(process.cwd(), 'packages'), search, {
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
  const command = 'node node_modules/ts-node/dist/bin.js -P tsconfig.json ' + relative
  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('Command failed:')) {
      throw error
    }
  }
}

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
      return fullpath.endsWith('.test.ts')
    },
  })
  if (!fpath) throw new Error('File not found: ' + search)
  const relative = absoluteToRelativePath(fpath).replace(/\\/g, '/')
  const command = 'jest ' + relative + (coverage ? ' --coverage' : '')
  execSync(command, { stdio: 'inherit' })
}

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

import fs from 'fs'
import path from 'path'
import { deleteDirectorySafeSync } from '../../packages/util/src'
import { getPackages } from './getPackages'

export function wipeNodeModules(args: string[]) {
  getPackages().forEach(({ name, rootdir }) => {
    const dir = path.join(rootdir, 'node_modules')
    const plock = path.join(rootdir, 'package-lock.json')
    if (fs.existsSync(dir)) {
      deleteDirectorySafeSync(dir)
      console.log(`Deleted ${name}/node_modules/`)
    }
    if (args.includes('lock') && fs.existsSync(plock)) {
      fs.rmSync(plock, { force: true })
      console.log(`Deleted ${name}/package-lock.json`)
    }
  })

  if (args.includes('all')) {
    const dir = path.join(process.cwd(), 'node_modules')
    const plock = path.join(process.cwd(), 'package-lock.json')
    if (fs.existsSync(dir)) {
      deleteDirectorySafeSync(dir)
      console.log(`Deleted ${'tsmono'}/node_modules`)
    }
    if (args.includes('lock') && fs.existsSync(plock)) {
      fs.rmSync(plock, { force: true })
      console.log(`Deleted ${'tsmono'}/package-lock.json`)
    }
  }
}

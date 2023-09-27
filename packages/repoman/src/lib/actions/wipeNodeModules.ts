import { removeFileSync } from '@bemoje/util'
import fs from 'fs-extra'
import path from 'path'
import { getPackages } from '../util/getPackages'

export function wipeNodeModules(
  packages: string[],
  options: { scope?: string; packageLock?: boolean; root?: boolean } = {}
) {
  console.log({ packages, options })
  return
  if (options.scope) {
    const scope = '@' + options.scope
    getPackages(packages).forEach(({ name, rootdir }) => {
      const dir = path.join(rootdir, 'node_modules', scope)
      const plock = path.join(rootdir, 'package-lock.json')
      if (fs.existsSync(dir)) {
        removeFileSync(dir)
        console.log(`Deleted ${name}/node_modules/` + options.scope)
      }

      if (options.packageLock && fs.existsSync(plock)) {
        fs.rmSync(plock, { force: true })
        console.log(`Deleted ${name}/package-lock.json`)
      }
    })
    if (options.root) {
      const dir = path.join(process.cwd(), 'node_modules', scope)
      const plock = path.join(process.cwd(), 'package-lock.json')
      if (fs.existsSync(dir)) {
        removeFileSync(dir)
        console.log(`Deleted ${'tsmono'}/node_modules/` + scope)
      }
      if (options.packageLock && fs.existsSync(plock)) {
        fs.rmSync(plock, { force: true })
        console.log(`Deleted ${'tsmono'}/package-lock.json`)
      }
    }
  } else {
    getPackages(packages).forEach(({ name, rootdir }) => {
      const dir = path.join(rootdir, 'node_modules')
      const plock = path.join(rootdir, 'package-lock.json')
      if (fs.existsSync(dir)) {
        removeFileSync(dir)
        console.log(`Deleted ${name}/node_modules/`)
      }
      if (options.packageLock && fs.existsSync(plock)) {
        fs.rmSync(plock, { force: true })
        console.log(`Deleted ${name}/package-lock.json`)
      }
    })

    if (options.root) {
      const dir = path.join(process.cwd(), 'node_modules')
      const plock = path.join(process.cwd(), 'package-lock.json')
      if (fs.existsSync(dir)) {
        removeFileSync(dir)
        console.log(`Deleted ${'tsmono'}/node_modules`)
      }
      if (options.packageLock && fs.existsSync(plock)) {
        fs.rmSync(plock, { force: true })
        console.log(`Deleted ${'tsmono'}/package-lock.json`)
      }
    }
  }
}

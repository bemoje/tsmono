import fs from 'fs'
import path from 'path'
import { execBatch } from '../../packages/node/src/lib/execBatch'

export function npmInstall() {
  const toInstall = process.argv.slice(2)
  const target = toInstall.shift()
  if (!target) throw new Error('no target package selected')
  if (!toInstall.length) throw new Error('no packages to install')

  const cwd = process.cwd()
  let rootpkg = () => JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'))
  const rootdir = path.join(cwd, 'packages', target)
  const pkgpath = path.join(rootdir, 'package.json')

  const bat = ['cd ' + cwd]
  for (const name of toInstall) {
    if (name.startsWith('@bemoje/')) {
      const pkg = JSON.parse(fs.readFileSync(pkgpath, 'utf8'))
      pkg.dependencies[name] = 'latest'
    } else {
      bat.push('npm install ' + name)
      try {
        bat.push('npm install --save-dev @types/' + name)
      } catch (error) {
        //
      }
    }
  }
  execBatch(bat)
  const orootpkg = rootpkg()
  for (const name of toInstall) {
    const pkg = JSON.parse(fs.readFileSync(pkgpath, 'utf8'))
    pkg.dependencies[name] = orootpkg.dependencies[name]
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
    execBatch([`cd ${rootdir}`, 'npm i'])
  }
}

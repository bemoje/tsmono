import { arrEvery } from '@bemoje/node-util'
import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { getPackages } from './util/getPackages'
import { hashPackage } from './util/hashPackage'
import { pkgRepoDependents } from './util/pkgRepoDependents'

const modifiers = ['test', 'build', 'docsmd', 'docshtml']

const scripts = process.argv
  .slice(2)
  .map((script) => {
    if (script === 'docs') return ['docsmd', 'docshtml']
    if (script === 'prepub') return ['test', 'build', 'docsmd', 'docshtml']
    return [script]
  })
  .flat(1)

console.log({ scripts })

const packages = getPackages()

const order = ['node-util']
const numExternals = order.length
const length = packages.length + numExternals

while (order.length < length) {
  const curLen = order.length
  for (const { name, deps } of packages) {
    if (order.includes(name)) continue

    if (arrEvery(deps, (dep) => order.includes(dep))) {
      const i = packages.findIndex((o) => o.name === name)
      packages.splice(i, 1)
      order.push(name)
    }
  }
  if (curLen === order.length) {
    console.error('Circular dependency detected')
    const remains = packages.map(({ name, deps }) => ({ name, deps })).filter(({ name }) => !order.includes(name))
    console.dir({ order, remains }, { depth: null })
    process.exit(1)
  }
}

const hashfile = path.join(process.cwd(), 'scripts', 'data', 'hashes.json')
if (!fs.existsSync(hashfile)) {
  fs.writeFileSync(hashfile, '{}', 'utf8')
}
const hashes = JSON.parse(fs.readFileSync(hashfile, 'utf8'))

const bat =
  '@echo off\n\ncall npm run wipe-bemoje\n\n' +
  order
    .slice(numExternals)
    .map((name) => {
      const hashesWiped = new Set()
      const _scripts = hashPackage(name, scripts)
        .map(([script, hash]) => {
          if (!modifiers.includes(script)) return script
          if (!hashes[name]) {
            hashes[name] = {}
          }
          if (hashes[name][script] !== hash) {
            if (!hashesWiped.has(name)) {
              hashes[name] = {}
              hashesWiped.add(name)
            }
            hashes[name][script] = hash
            const pkgpath = path.join(process.cwd(), 'pkg', name, 'package.json')
            const pkg = JSON.parse(fs.readFileSync(pkgpath, 'utf8'))
            pkgRepoDependents(pkg).forEach((p) => (hashes[p.name] = {}))
            return script
          }
          return ''
        })
        .filter((s) => !!s)
      const rootdir = path.join(process.cwd(), 'pkg', name)
      return [`call cd ${rootdir}`, _scripts.map((script) => `call npm run ${script}`).join('\n')].join('\n')
    })
    .join('\n\n') +
  '\n\ncall cd ' +
  process.cwd() +
  '\ncall npm run fix-docs\ncall npm run wipe-bemoje'

const tempdir = process.env['TEMP']!
const tempfile = path.join(tempdir, Date.now() + '.bat')
console.log(bat.replace(/^call /gm, ''))
let failed = false
fs.writeFileSync(tempfile, bat, 'utf8')
try {
  execFileSync(tempfile, { stdio: 'inherit' })
} catch (error) {
  failed = true
  console.log(error)
}
fs.rmSync(tempfile)

if (!failed) fs.writeFileSync(hashfile, JSON.stringify(hashes, null, 2), 'utf8')

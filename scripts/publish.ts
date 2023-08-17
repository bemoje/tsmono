import fs from 'fs'
import path from 'path'
import { arrEvery } from '../pkg/array/src/lib/arrEvery'
import { execBatch } from '../pkg/node/src/lib/execBatch'
import { getPackages } from './util/getPackages'
import { hashPackage } from './util/hashPackage'

// args
const type = process.argv[2]
if (!type) throw new Error('no version upgrade type provided. Can be patch, minor or major.')

const cwd = process.cwd()
let names = process.argv.slice(3)
const runAll = !names.length
if (runAll) {
  names = fs.readdirSync(path.join(cwd, 'pkg'))
}

const packages = getPackages()
const order: string[] = []
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
names = order.filter((name) => names.includes(name))

console.log({ publishing: names })

// prepub
execBatch(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')], () => process.exit())

// hashes
const hashesPath = path.join(process.cwd(), 'scripts', 'data', 'hashes.json')
const hashes = JSON.parse(fs.readFileSync(hashesPath, 'utf8'))

// npm publish
const failed: string[] = []
const installGlobally: string[] = []
getPackages()
  .filter(({ name }) => names.includes(name))
  .forEach(({ name, rootdir, pkgpath, pkg }) => {
    let hash = hashPackage(name)
    if (hashes[name] === hash) return

    const original = pkg.version + ''
    const version = pkg.version.split('.').map(Number)
    if (type === 'patch') {
      version[2] += 1
    } else if (type === 'minor') {
      version[1] += 1
      version[2] = 0
    } else if (type === 'major') {
      version[0] += 1
      version[1] = 0
      version[2] = 0
    }
    pkg.version = version.join('.')
    pkg.main = 'dist/index.cjs.js'
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')

    let success = true
    execBatch(
      [
        `cd ${rootdir}`,
        'npm i',
        'npm publish --access public',
        //
      ],
      () => {
        success = false
        failed.push(name)
        pkg.version = original
        fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
      },
    )

    pkg.main = 'src/index.ts'
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')

    if (success) hashes[name] = hashPackage(name)
    fs.writeFileSync(hashesPath, JSON.stringify(hashes, null, 2), 'utf8')

    if (pkg.preferGlobal) {
      installGlobally.push('npm i -g ' + pkg.name)
    }
  })
console.log({ failed })
if (failed.length) process.exit()

// prepub and commit
execBatch(
  [
    `cd ${cwd}`,
    'npm run prepub' + (!runAll ? ' -p ' + names.join(',') : ''),
    ...installGlobally,
    'git add .',
    `git commit -m "publish new version (${type}) of packages: ${names.join(', ')}."`,
    //
  ],
  () => process.exit(),
)

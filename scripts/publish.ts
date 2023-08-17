import fs from 'fs'
import path from 'path'
import { execBatch } from '../pkg/node/src/lib/execBatch'
import { getPackages } from './util/getPackages'
import { hashPackage } from './util/hashPackage'

// args
const type = process.argv[2]
if (!type) throw new Error('no version upgrade type provided. Can be patch, minor or major.')

const cwd = process.cwd()
let names = process.argv.slice(3)
const runAll = !names.length
if (runAll) names = fs.readdirSync(path.join(cwd, 'pkg'))

// prepub
execBatch(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')], () => process.exit())

// hashes
const hashesPath = path.join(process.cwd(), 'scripts', 'data', 'hashes.json')
const hashes = JSON.parse(fs.readFileSync(hashesPath, 'utf8'))

// npm publish
const failed: string[] = []
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

    if (!pkg.preferGlobal) pkg.main = 'src/index.ts'
    fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')

    if (success) hashes[name] = hashPackage(name)
    fs.writeFileSync(hashesPath, JSON.stringify(hashes, null, 2), 'utf8')
  })
console.log({ failed })
if (failed.length) process.exit()

// prepub and commit
execBatch(
  [
    'npm run prepub' + (!runAll ? ' -p ' + names.join(',') : ''),
    'git add .',
    `git commit -m "publish new version (${type}) of packages: ${names.join(', ')}."`,
    //
  ],
  () => process.exit(),
)

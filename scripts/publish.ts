import fs from 'fs'
import path from 'path'
import { execBatch } from '../packages/node/src/lib/execBatch'
import { docs } from './util/docs'
import { getPackages } from './util/getPackages'
import { hashPackage } from './util/hashPackage'

// args
const type = process.argv[2]
if (!type) throw new Error('no version upgrade type provided. Can be patch, minor or major.')

const cwd = process.cwd()
let names = process.argv.slice(3)
const runAll = !names.length
if (runAll) {
  names = fs.readdirSync(path.join(cwd, 'packages')).filter((name) => !name.startsWith('.'))
}

// prepub
execBatch(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')], () => process.exit())

// hashes
const hashesPath = path.join(process.cwd(), 'scripts', 'data', 'hashes.json')
const hashes = JSON.parse(fs.readFileSync(hashesPath, 'utf8'))

// npm publish
const failed: string[] = []
const installGlobally: string[] = []
const successful: string[] = []

getPackages().forEach(({ name, rootdir, pkgpath, pkg, distdir }) => {
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
  fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')

  // Update version of CLIs in dist directory.
  if (pkg.preferGlobal) {
    const srcpath = path.join(distdir, 'index.cjs.js')
    if (fs.existsSync(srcpath)) {
      const src = fs.readFileSync(srcpath, 'utf8').replace("('0.0.0')", `('${pkg.version}')`)
      fs.writeFileSync(srcpath, src, 'utf8')
    }

    const esmpath = path.join(distdir, 'index.esm.js')
    if (fs.existsSync(esmpath)) {
      const esm = fs.readFileSync(esmpath, 'utf8').replace("('0.0.0')", `('${pkg.version}')`)
      fs.writeFileSync(esmpath, esm, 'utf8')
    }
  }
  const distpkgpath = path.join(distdir, 'package.json')
  const distpkgsrc = fs
    .readFileSync(distpkgpath, 'utf8')
    .replace(/"version"\: "\d+\.\d+\.\d+"/g, `"version": "${pkg.version}"`)
  fs.writeFileSync(distpkgpath, distpkgsrc, 'utf8')

  // npm update
  let success = true
  execBatch(
    [
      `cd ${path.join(distdir)}`,
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

  // hash
  if (success) {
    hashes[name] = hashPackage(name)
    fs.writeFileSync(hashesPath, JSON.stringify(hashes, null, 2), 'utf8')

    if (pkg.preferGlobal) {
      installGlobally.push('npm i -g ' + pkg.name + '@^' + pkg.version)
    }

    successful.push(name)
  }
})
console.log({ failed })
if (failed.length) process.exit()

// update own modules in all packages
execBatch([`cd ${cwd}`, 'npm update @bemoje/*'], () => process.exit())
getPackages().forEach(({ name, rootdir }) => {
  execBatch([`cd ${rootdir}`, 'npm update @bemoje/*'])
})

// prepub
execBatch(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')], () => process.exit())
docs()

// prepub and commit
execBatch(
  [
    `cd ${cwd}`,
    ...installGlobally,
    'npm update -g',
    'npm audit fix',
    'git add .',
    `git commit -m "published new versions (${type}) of packages: ${successful.join(', ')}."`,
    // 'git push -u origin main',
    //
  ],
  () => process.exit(),
)

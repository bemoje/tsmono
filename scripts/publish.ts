import { blackBright, green, red } from 'cli-color'
import fs from 'fs'
import path from 'path'
import { executeBatchScript } from '../packages/node/src/lib/virtual-script/executeBatchScript'
import { docs } from './util/docs'
import { execBatch } from './util/execBatch'
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
executeBatchScript(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')], {
  prependWithCall: true,
})

// hashes
const hashesPath = path.join(process.cwd(), 'scripts', 'data', 'hashes.json')
const hashes = JSON.parse(fs.readFileSync(hashesPath, 'utf8'))

// npm publish
const installGlobally: string[] = []
const successful: string[] = []

console.log(green('Publishing packages with changes to NPM...'))
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
    .replace(/"version"\: "\d+\.\d+\.\d+"/, `"version": "${pkg.version}"`)
  fs.writeFileSync(distpkgpath, distpkgsrc, 'utf8')

  // npm update
  execBatch(
    [
      `cd ${path.join(distdir)}`,
      'npm publish --access public',
      //
    ],
    () => {
      pkg.version = original
      fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
      console.error(red('Could not publish ' + name + '. Reverting version to ' + original + '.'))
      process.exit()
    }
  )

  // hash
  hashes[name] = hashPackage(name)
  fs.writeFileSync(hashesPath, JSON.stringify(hashes, null, 2), 'utf8')

  if (pkg.preferGlobal) {
    installGlobally.push('npm i -g ' + pkg.name + '@^' + pkg.version)
  }

  successful.push(name + ' v.' + pkg.version)
})

// update own modules
console.log(green('Updating own modules in root...'))
const updatebat = ['npm update @bemoje/*', 'npm audit --fix']
executeBatchScript(updatebat, {
  silent: true,
  prependWithCall: true,
})

console.log(green('Updating own modules in all packages...'))
const dependentPackages = getPackages().filter(({ name, rootdir, pkg }) => {
  const deps = new Set([...Object.keys(pkg.dependencies)])
  for (let str of successful) {
    if (deps.has('@bemoje/' + str.split(' ')[0])) {
      return true
    }
  }
  return false
})
dependentPackages.forEach(({ name, rootdir }) => {
  executeBatchScript([`cd ${rootdir}`, 'npm update @bemoje/*'], {
    silent: true,
    prependWithCall: true,
  })
  console.log(blackBright('- ' + name))
})

// prepub
executeBatchScript(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')], {
  prependWithCall: true,
})

// docs
if (successful.length) docs()

// update global modules and git commit
console.log(green('Update global modules and git commit...'))
executeBatchScript([...installGlobally, 'git add .'], {
  prependWithCall: true,
})

if (successful.length) {
  executeBatchScript([`git commit -m "published new versions (${type}) of packages: ${successful.join(' || ')}"`], {
    prependWithCall: true,
  })
}

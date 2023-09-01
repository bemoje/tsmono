import { blackBright, green, red } from 'cli-color'
import fs from 'fs'
import path from 'path'
import { prettyUncaughtException } from '../packages/node/src/lib/prettyUncaughtException'
import { docs } from './util/docs'
import { execBatch, execBatchSilently } from './util/execBatch'
import { getPackages } from './util/getPackages'
import { hashPackage } from './util/hashPackage'

// Pretty print uncaught exceptions.
prettyUncaughtException()

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
execBatch(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')])

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
    .replace(/"version"\: "\d+\.\d+\.\d+"/g, `"version": "${pkg.version}"`)
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
    },
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
execBatchSilently(updatebat, console.error)

console.log(green('Updating own modules in all packages...'))
getPackages().forEach(({ name, rootdir }) => {
  execBatchSilently([`cd ${rootdir}`, 'npm update @bemoje/*'], console.error)
  console.log(blackBright('- ' + name))
})

// prepub
execBatch(['npm run prepub' + (!runAll ? ' -p ' + names.join(',') : '')])

// docs
docs()

// update global modules and git commit
console.log(green('Update global modules and git commit...'))
execBatch([
  ...installGlobally,
  'npm update -g @bemoje/*',
  'npm audit --fix',
  'git add .',
  successful.length
    ? `git commit -m "published new versions (${type}) of packages: ${successful.join(' || ') || 'none'}"`
    : `git commit -m "changes in repository configuration."`,
  // 'git push -u origin main',
  //
])

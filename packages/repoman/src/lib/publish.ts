/* eslint-disable no-useless-escape */
import { colors, executeBatchScript, getAppDataPath } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import { deleteTmpDir } from './deleteTmpDir'
import { docs } from './docs'
import { getPackages } from './getPackages'
import { hashPackage } from './hashPackage'
import { prepub } from './prepub'
const { gray, green, red } = colors

export function publish(type: string, names: string[] = []) {
  // args
  // const type = args[0]
  if (!type) throw new Error('no version upgrade type provided. Can be patch, minor or major.')

  const cwd = process.cwd()
  // let names = args.slice(1)
  const runAll = !names.length
  if (runAll) {
    names = fs.readdirSync(path.join(cwd, 'packages')).filter((name) => !name.startsWith('.'))
  }
  process.argv.splice(2, 1)

  // prepub
  prepub(names)

  // hashes
  const appdata = getAppDataPath('bemoje', 'repoman')
  fs.mkdirSync(appdata, { recursive: true })
  const hashesPath = path.join(appdata, 'hashes.json')
  if (!fs.existsSync(hashesPath)) {
    fs.writeFileSync(hashesPath, '{}', 'utf8')
  }
  const hashes = JSON.parse(fs.readFileSync(hashesPath, 'utf8'))

  // npm publish
  const installGlobally: string[] = []
  const successful: string[] = []

  console.log(green('Publishing packages with changes to NPM...'))
  getPackages().forEach(({ name, pkgpath, pkg, distdir }) => {
    const hash = hashPackage(name)
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
    const { error } = executeBatchScript(['npm publish --access public'], {
      prependWithCall: true,
      cwd: distdir,
      silent: true,
    })
    if (error) {
      pkg.version = original
      fs.writeFileSync(pkgpath, JSON.stringify(pkg, null, 2), 'utf8')
      console.error(red('Could not publish ' + name + '. Reverting version to ' + original + '.'))
      process.exit()
    }

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
    for (const str of successful) {
      if (deps.has('@bemoje/' + str.split(' ')[0])) {
        return true
      }
    }
    return false
  })
  dependentPackages.forEach(({ name, rootdir }) => {
    executeBatchScript(['npm update @bemoje/*'], {
      silent: true,
      prependWithCall: true,
      cwd: rootdir,
    })
    console.log(gray('- ' + name))
  })

  // prepub
  prepub(names)

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

  deleteTmpDir()
}

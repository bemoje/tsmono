/* eslint-disable no-useless-escape */
import { colors, executeBatchScript, writeJsonFileSync } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import { PackageHashes } from './PackageHashes'
import { docs } from './docs'
import { getPackages } from './getPackages'
import { pkgRepoDependenciesRecursive } from './pkgRepoDependenciesRecursive'
import { prepub } from './prepub'
import { semverVersionBump } from './util/semverVersionBump'
const { gray, green, red } = colors

export function publish(level: string, packages: string[]) {
  if (packages) {
    packages = pkgRepoDependenciesRecursive(...packages)
  } else {
    packages = fs.readdirSync(path.join(process.cwd(), 'packages')).filter((name) => !name.startsWith('.'))
  }

  // prepub
  prepub(packages)

  // hashes
  const hashes = new PackageHashes()

  // npm publish
  const installGlobally: string[] = []
  const successful: string[] = []

  console.log(green('Publishing packages with changes to NPM...'))
  getPackages(packages).forEach(({ name, pkgpath, pkg, distdir }) => {
    if (hashes.currentHash(name) === hashes.hash(name)) return
    console.log(gray('- ' + name))
    const original = String(pkg.version)
    pkg.version = semverVersionBump(original, level as 'major' | 'minor' | 'patch')
    writeJsonFileSync(pkgpath, pkg, true, 2)

    // Update version of CLIs in dist directory.
    if (pkg.preferGlobal) {
      const cjspath = path.join(distdir, 'index.cjs.js')
      if (fs.existsSync(cjspath)) {
        const cjs = fs.readFileSync(cjspath, 'utf8').replace("('0.0.0')", `('${pkg.version}')`)
        fs.writeFileSync(cjspath, cjs, 'utf8')
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
      writeJsonFileSync(pkgpath, pkg, true, 2)
      console.error(red('Could not publish ' + name + '. Reverting version to ' + original + '.'))
      process.exit()
    }

    // hash
    hashes.updateHash(name)

    // install CLIs globally
    if (pkg.preferGlobal) {
      installGlobally.push('npm i -g ' + pkg.name + '@^' + pkg.version)
    }

    successful.push(name + ' v.' + pkg.version)
  })

  if (!successful.length) return

  // install updated modules
  console.log(green('Installing the updated modules in affected packages.'))
  console.log(gray('- monorepo root'))
  executeBatchScript(['npm update @bemoje/*', 'npm audit --fix'], {
    silent: true,
    prependWithCall: true,
  })

  getPackages(packages).forEach(({ name, rootdir }) => {
    console.log(gray('- ' + name))
    executeBatchScript(['npm update @bemoje/*'], {
      silent: true,
      prependWithCall: true,
      cwd: rootdir,
    })
  })

  // prepub
  prepub(packages)

  // docs
  docs()

  // update global modules and git commit
  console.log(green('Update global modules and git commit...'))
  executeBatchScript([...installGlobally, 'git add .'], {
    prependWithCall: true,
  })

  executeBatchScript([`git commit -m "published new versions (${level}) of packages: ${successful.join(' || ')}"`], {
    prependWithCall: true,
  })
}

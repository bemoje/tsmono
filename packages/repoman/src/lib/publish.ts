/* eslint-disable no-useless-escape */
import { colors, executeBatchScript, updateFileSafeSync, updateFileSync, writeJsonFileSync } from '@bemoje/util'
import fs from 'fs'
import path from 'path'
import { PackageHashes } from './PackageHashes'
import { docs } from './docs'
import { getPackages } from './getPackages'
import { pkgRepoDependenciesRecursive } from './pkgRepoDependenciesRecursive'
import { pkgRepoDirectDependents } from './pkgRepoDirectDependents'
import { prepub } from './prepub'
import { semverVersionBump } from './util/semverVersionBump'
const { gray, green, red } = colors

export function allPackageNames() {
  const ppath = path.join(process.cwd(), 'packages')
  return fs.readdirSync(ppath).filter((name) => {
    const fpath = path.join(ppath, name)
    return fs.statSync(fpath).isDirectory()
  })
}

export function allPackageRoots() {
  const ppath = path.join(process.cwd(), 'packages')
  return fs
    .readdirSync(ppath)
    .map((name) => {
      return path.join(ppath, name)
    })
    .filter((fpath) => {
      return fs.statSync(fpath).isDirectory()
    })
}

export function publish(level: string, packages: string[] = []) {
  const _packages = packages.length ? pkgRepoDependenciesRecursive(...packages) : allPackageNames()

  // prepub
  prepub(packages)

  // hashes
  const hashes = new PackageHashes()

  // npm publish
  const installGlobally: string[] = []
  const successful: string[] = []

  console.log(green('Publishing packages with changes to NPM...'))
  getPackages(_packages).forEach(({ name, pkgpath, pkg, distdir }) => {
    console.log(gray('- ' + name))

    if (hashes.currentHash(name) === hashes.hash(name)) {
      console.log(gray('  - ' + 'No changes.'))
      return
    }

    console.log(gray('  - ' + 'Bump semver version'))
    const original = String(pkg.version)
    pkg.version = semverVersionBump(original, level as 'major' | 'minor' | 'patch')
    writeJsonFileSync(pkgpath, pkg, true, 2)

    if (pkg.preferGlobal) {
      console.log(gray('    - ' + 'Update version of CLIs in dist directory.'))
      updateFileSafeSync(path.join(distdir, 'index.cjs.js'), (src) => {
        return src.replace(/('0.0.0')/, `('${pkg.version}')`)
      })
      updateFileSafeSync(path.join(distdir, 'index.esm.js'), (src) => {
        return src.replace(/('0.0.0')/, `('${pkg.version}')`)
      })
    }

    console.log(gray('    - ' + 'Update package.json version in dist directory.'))
    updateFileSync(
      path.join(distdir, 'package.json'),
      (src) => {
        return src.replace(/"version"\: "\d+\.\d+\.\d+"/, `"version": "${pkg.version}"`)
      },
      JSON.stringify(pkg, null, 2)
    )

    console.log(gray('  - ' + 'npm update'))
    const { error } = executeBatchScript(['npm publish --access public'], {
      prependWithCall: true,
      cwd: distdir,
      silent: true,
    })
    if (error) {
      console.error('    - ' + red('Could not publish ' + name + '. Reverting version to ' + original + '.'))
      pkg.version = original
      writeJsonFileSync(pkgpath, pkg, true, 2)
      return
    } else {
      console.log(gray('    - ' + 'Successfully published ' + pkg.name + '@' + pkg.version))
    }

    console.log(gray('  - ' + 'Update hash'))
    hashes.updateHash(name)

    if (pkg.preferGlobal) {
      console.log(
        gray('  - ' + 'has preferGlobal option. Will be installed globally after all packages are published.')
      )
      installGlobally.push('npm i -g ' + pkg.name + '@' + pkg.version)
    }

    successful.push(pkg.name + '@' + pkg.version)
  })

  if (!successful.length) return

  console.log(green('Run prepublish...'))
  prepub(packages)

  // docs
  docs()

  // install updated modules
  console.log(green('Installing the updated modules in affected packages...'))
  console.log(gray('- monorepo root'))
  executeBatchScript(['npm update @bemoje/*'], {
    silent: true,
  })
  getPackages(pkgRepoDirectDependents(..._packages)).forEach(({ name, rootdir }) => {
    console.log(gray('- ' + name))
    executeBatchScript(['npm update @bemoje/*'], {
      silent: true,
      cwd: rootdir,
    })
  })

  if (installGlobally.length) {
    console.log(green('Install CLI packages globally: ' + installGlobally.join(', ')))
    executeBatchScript([...installGlobally], {
      prependWithCall: true,
      silent: true,
    })
  }

  console.log(green('git commit...'))
  executeBatchScript(
    ['git add .', `git commit -m "published new versions (${level}) of packages: ${successful.join(', ')}"`],
    {
      prependWithCall: true,
    }
  )
}

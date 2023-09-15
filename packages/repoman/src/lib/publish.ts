/* eslint-disable no-useless-escape */
import { colors, execute, updateFileSafeSync, updateFileSync, writeJsonFileSync } from '@bemoje/util'
import path from 'path'
import { allPackageNames } from './allPackageNames'
import { docs } from './docs'
import { getPackages } from './getPackages'
import { implicitDependenciesRecursive } from './implicitDependenciesRecursive'
import { prepub } from './prepub'
import { updateImplicitDependencies } from './updateImplicitDependencies'
import { PackageHashes } from './util/PackageHashes'
import { semverVersionBump } from './util/semverVersionBump'
const { gray, green, red, magenta } = colors

export function publish(level: string, packages?: string[]) {
  const _packages = packages ? implicitDependenciesRecursive(...packages) : allPackageNames()

  // prepub
  prepub(packages)

  // hashes
  const hashes = new PackageHashes()

  // npm publish
  const installGlobally: string[] = []
  const successful: string[] = []

  console.log(green('Publishing packages with changes to NPM...'))
  getPackages(_packages).forEach(({ name, pkgpath, pkg, distdir }) => {
    if (hashes.currentHash(name) === hashes.hash(name)) return

    console.log(gray('- ') + magenta(name))
    console.log(gray('  - ' + 'Bump semver version'))
    const original = String(pkg.version)
    pkg.version = semverVersionBump(original, level as 'major' | 'minor' | 'patch')
    writeJsonFileSync(pkgpath, pkg, true, 2)

    if (pkg.preferGlobal) {
      console.log(gray('    - ' + 'Update version of CLIs in dist directory.'))
      updateFileSafeSync(path.join(distdir, 'index.cjs.js'), (src) => {
        return src.replace(/\((\'|\")0\.0\.0(\'|\")\)/, `('${pkg.version}')`)
      })
      updateFileSafeSync(path.join(distdir, 'index.esm.js'), (src) => {
        return src.replace(/\((\'|\")0\.0\.0(\'|\")\)/, `('${pkg.version}')`)
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

    try {
      console.log(gray('  - ' + 'npm update'))
      execute('npm publish --access public', {
        cwd: distdir,
        noEcho: true,
        silent: true,
      })
      console.log(gray('    - ' + 'Successfully published ' + pkg.name + '@' + pkg.version))
    } catch (error) {
      console.error('    - ' + red('Could not publish ' + name + '. Reverting version to ' + original + '.'))
      pkg.version = original
      writeJsonFileSync(pkgpath, pkg, true, 2)
      return
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

  if (!packages) docs()

  // install updated modules
  console.log(green('Installing the updated modules in affected packages...'))
  console.log(gray('- monorepo root'))
  const npmNames = successful.map((s) => s.substring(0, s.lastIndexOf('@')))
  if (npmNames.length) {
    execute('npm update ' + npmNames.join(' '), {
      // noEcho: true,
      silent: true,
      fadedOutput: true,
    })
  }

  console.log(green('Ensuring latest version of implicit dependencies are installed in all packages.'))
  updateImplicitDependencies()

  prepub(packages)

  if (installGlobally.length) {
    console.log(green('Install CLI packages globally: ' + installGlobally.join(', ')))
    execute(installGlobally, {
      silent: true,
    })
  }

  execute('git add .', { fadedOutput: true })
  execute(`git commit -m "published new versions (${level}) of packages: ${successful.join(', ')}"`, {
    fadedOutput: true,
  })
}

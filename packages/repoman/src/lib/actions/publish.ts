/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-useless-escape */
import path from 'path'
import { allPackageNames } from '../util/allPackageNames'
import {
  Any,
  colors,
  execute,
  readFileSafeSync,
  readJsonFileSafeSync,
  updateFileSync,
  writeFileSafeSync,
  writeJsonFileSafeSync,
} from '@bemoje/util'
import { build } from './build'
import { docs } from './docs'
import { getPackages } from '../util/getPackages'
import { implicitDependenciesRecursive } from '../util/implicitDependenciesRecursive'
import { PackageHashes } from '../util/PackageHashes'
import { prepub } from './prepub'
import { semverVersionBump } from '../util/semverVersionBump'
import { updateImplicitDependencies } from '../util/updateImplicitDependencies'
import { walkDirectorySync } from '@bemoje/fswalk'
const { gray, magenta: green, red, magenta: magenta } = colors

export function publish(packages: string[], options: { level?: string; ignoreHash?: boolean } = {}) {
  const level = options?.level || 'patch'
  const _packages = packages.length ? [...packages, ...implicitDependenciesRecursive(...packages)] : allPackageNames()

  getPackages(packages).forEach((o) => {
    if (!o.repomanConfigJson.npm.bin) return
    walkDirectorySync(o.srcdir, {}, (filepath, stats) => {
      if (!stats.isFile()) return
      if (filepath.endsWith('.test.ts')) return
      const code = readFileSafeSync(filepath)
      if (!code) return
      const re = /\.version\('[0-9]+\.[0-9]+\.[0-9]'\)/
      if (!re.test(code)) return
      const newVersion = semverVersionBump(o.packageJson.version || '0.0.0', level as 'major' | 'minor' | 'patch')
      const newCode = code.replace(re, `.version('${newVersion}')`)
      writeFileSafeSync(filepath, newCode)
    })
  })

  // prepub
  prepub(packages)

  // hashes
  const hashes = new PackageHashes()

  // npm publish
  const installGlobally: string[] = []
  const successful: string[] = []

  console.log(green('Publishing packages with changes to NPM...'))
  getPackages(_packages).forEach(({ name, pkgpath, pkg, distDir }) => {
    if (!options.ignoreHash && hashes.currentHash(name) === hashes.hash(name)) return

    console.log(gray('- ') + magenta(name))
    console.log(gray('  - ' + 'Bump semver version'))
    const original = String(pkg.version)
    pkg.version = semverVersionBump(original, level as 'major' | 'minor' | 'patch')
    writeJsonFileSafeSync(pkgpath, pkg, { spaces: 2 })

    console.log(gray('    - ' + 'Update package.json version in dist directory.'))
    const distPkgPath = path.join(distDir, 'package.json')
    updateFileSync(distPkgPath, (src) => {
      return src.replace(/"version"\: "\d+\.\d+\.\d+"/, `"version": "${pkg.version}"`)
    })
    const distPkg: Any = readJsonFileSafeSync(distPkgPath)
    if (!distPkg) throw new Error('Missing dist package.json')

    try {
      console.log(gray('  - ' + 'npm update'))
      execute('npm publish --access public', {
        cwd: distDir,
        noEcho: true,
        silent: false,
      })
      console.log(gray('    - ' + 'Successfully published ' + pkg.name + '@' + pkg.version))
    } catch (error) {
      console.error('    - ' + red('Could not publish ' + name + '. Reverting version to ' + original + '.'))
      pkg.version = original
      writeJsonFileSafeSync(pkgpath, pkg, { spaces: 2 })
      return
    }

    console.log(gray('  - ' + 'Update hash'))
    hashes.updateHash(name)

    if (distPkg.preferGlobal) {
      console.log(
        gray('  - ' + 'has preferGlobal option. Will be installed globally after all packages are published.')
      )
      installGlobally.push('npm i -g ' + pkg.name + '@' + pkg.version)
    }

    successful.push(pkg.name + '@' + pkg.version)
  })

  if (!successful.length) {
    console.log(red('\nNo changes found. Nothing was published. Exiting...\n'))
    return
  }

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
  const set = getPackages(packages).reduce((set, o) => {
    o.implicitDependents(true).forEach((n) => set.add(n))
    return set
  }, new Set<string>())
  updateImplicitDependencies([...set])

  // console.log(green('Building packages.'))
  // build(packages)

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

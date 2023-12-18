import { colors, emptyDirectorySync, execute, writeFileSafeSync, writeJsonFileSafeSync } from '@bemoje/util'
import { deleteTmpDir } from '../util/deleteTmpDir'
import { getPackages } from '../util/getPackages'
import { IPackageJson } from '../types/IPackageJson'
import { PackageDataView } from '../util/PackageDataView'

export function build(names: string[]) {
  console.log(colors.magenta('Finalizing dist directory...'))
  getPackages(names).forEach((o) => {
    emptyDirectorySync(o.distDir)
    copyReadmeToDist(o)
    createPackageJsonNpm(o)
    createDistBinDir(o)
  })

  execute('nx run-many -t build' + (names.length ? ' -p ' + names.join(',') : ''))

  deleteTmpDir()
}

function createPackageJsonNpm(o: PackageDataView) {
  const config = o.repomanConfigJson
  if (!config.npm.publish) return
  const pkgRepoRoot = o.monorepoPackageJson
  const pkgRepo = o.packageJson
  const pkgNpm: IPackageJson = {}
  pkgNpm.name = config.npm.name
  pkgNpm.version = pkgRepo.version
  pkgNpm.type = 'commonjs'
  pkgNpm.main = 'cjs/index.js'
  if (!config.npm.bin) {
    pkgNpm.module = 'esm/index.js'
  }
  pkgNpm.types = 'cjs/index.d.ts'
  if (config.npm.bin) {
    pkgNpm.bin = {}
    pkgNpm.bin[config.npm.bin] = './bin/index.js'
    pkgNpm.preferGlobal = true
  }
  pkgNpm.dependencies = pkgRepo.dependencies
  pkgNpm.license = config.npm.license
  pkgNpm.keywords = config.npm.keywords
  pkgNpm.author = pkgRepoRoot.author
  pkgNpm.repository = pkgRepoRoot.repository
  pkgNpm.funding = pkgRepoRoot.funding
  pkgNpm.bugs = pkgRepoRoot.bugs
  pkgNpm.homepage = pkgRepoRoot.homepage
  writeJsonFileSafeSync(o.distPackageJsonPath, pkgNpm, { spaces: 2 })
}

function copyReadmeToDist(o: PackageDataView) {
  writeFileSafeSync(o.distReadmeMdPath, o.readmeMd)
}

function createDistBinDir(o: PackageDataView) {
  if (!o.repomanConfigJson.npm.bin) return
  writeFileSafeSync(o.distBinIndexJsPath, ['#!/usr/bin/env node', "require('../cjs/index.js').main();"].join('\n'))
}

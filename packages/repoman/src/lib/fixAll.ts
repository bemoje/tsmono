import { fixDependencies } from './fixDependencies'
import { fixEntryPoints } from './fixEntryPoints'
import { fixPackageJson } from './fixPackageJson'
import { fixReadmes } from './fixReadmes'
import { fixTsConfigIncludes } from './fixTsConfigIncludes'

export function fixAll(
  options: {
    includes?: boolean
    entrypoints?: boolean
    deps?: boolean
    readmes?: boolean
    packageJsons?: boolean
  } = {}
) {
  const len = Object.keys(options).length
  if (!len || options.includes) fixTsConfigIncludes()
  if (!len || options.entrypoints) fixEntryPoints()
  if (!len || options.deps) fixDependencies()
  if (!len || options.readmes) fixReadmes()
  if (!len || options.packageJsons) fixPackageJson()
}

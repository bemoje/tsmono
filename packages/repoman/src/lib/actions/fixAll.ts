import { fixDependencies } from '../util/fixDependencies'
import { fixEntryPoints } from '../util/fixEntryPoints'
import { fixPackageJson } from '../util/fixPackageJson'
import { fixReadmes } from '../util/fixReadmes'
import { fixTsConfigIncludes } from '../util/fixTsConfigIncludes'

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

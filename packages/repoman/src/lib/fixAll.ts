import { fixDependencies } from './fixDependencies'
import { fixEntryPoints } from './fixEntryPoints'
import { fixPackageJson } from './fixPackageJson'
import { fixReadmes } from './fixReadmes'
import { fixTsConfigIncludes } from './fixTsConfigIncludes'

export function fixAll() {
  fixTsConfigIncludes()
  fixEntryPoints()
  fixDependencies()
  fixReadmes()
  fixPackageJson()
}

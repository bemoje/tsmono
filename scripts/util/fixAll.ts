import { fixDependencies } from './fixDependencies'
import { fixEntryPoints } from './fixEntryPoints'
import { fixReadmes } from './fixReadmes'
import { fixTsConfigIncludes } from './fixTsconfigIncludes'

export function fixAll() {
  fixTsConfigIncludes()
  fixEntryPoints()
  fixDependencies()
  fixReadmes()
}

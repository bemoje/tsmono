import { getImported } from './getImported'

export function getImportedBuiltins(pkgroot: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const builtins = new Set(require('module').builtinModules)
  return getImported(pkgroot).filter((imp) => builtins.has(imp))
}

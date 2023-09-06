import { getImported } from './getImported'

export function getImportedBuiltins(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const { imports, typeImports } = getImported(pkgroot)
  const builtins = new Set(require('module').builtinModules)
  const filter = (imp) => builtins.has(imp)
  return { imports: imports.filter(filter), typeImports: typeImports.filter(filter) }
}

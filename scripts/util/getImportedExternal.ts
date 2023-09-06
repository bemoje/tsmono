import { getImported } from './getImported'

export const builtins = new Set(require('module').builtinModules)

export function getImportedExternal(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const { imports, typeImports } = getImported(pkgroot)
  const filter = (imp) => !imp.startsWith('.') && !imp.startsWith('@bemoje/') && !builtins.has(imp)
  return { imports: imports.filter(filter), typeImports: typeImports.filter(filter) }
}

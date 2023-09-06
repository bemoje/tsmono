import { getImported } from './getImported'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const builtins = new Set(require('module').builtinModules)

export function getImportedExternal(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const { imports, typeImports } = getImported(pkgroot)
  const filter = (imp: string) => !imp.startsWith('.') && !imp.startsWith('@bemoje/') && !builtins.has(imp)
  return { imports: imports.filter(filter), typeImports: typeImports.filter(filter) }
}

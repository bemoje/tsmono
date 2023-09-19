import { getImported } from './getImported'

export function getImportedBuiltins(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const { imports, typeImports } = getImported(pkgroot)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const builtins = new Set(require('module').builtinModules)
  const filter = (imp: string) => builtins.has(imp)
  return { imports: imports.filter(filter), typeImports: typeImports.filter(filter) }
}

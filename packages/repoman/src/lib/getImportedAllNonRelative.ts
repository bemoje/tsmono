import { getImported } from './getImported'

export function getImportedAllNonRelative(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const { imports, typeImports } = getImported(pkgroot)
  const filter = (imp: string) => !imp.startsWith('.')
  return { imports: imports.filter(filter), typeImports: typeImports.filter(filter) }
}

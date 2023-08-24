import { getImported } from './getImported'

export function getImportedExternal(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const { imports, typeImports } = getImported(pkgroot)
  const filter = (imp) => !imp.startsWith('.')
  return { imports: imports.filter(filter), typeImports: typeImports.filter(filter) }
}

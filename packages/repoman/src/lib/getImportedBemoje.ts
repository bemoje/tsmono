import { getImported } from './getImported'

export function getImportedBemoje(pkgroot: string): { imports: string[]; typeImports: string[] } {
  const { imports, typeImports } = getImported(pkgroot)
  const filter = (imp: string) => imp.startsWith('@bemoje/')
  return { imports: imports.filter(filter), typeImports: typeImports.filter(filter) }
}

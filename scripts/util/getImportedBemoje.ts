import { getImported } from './getImported'

export function getImportedBemoje(pkgroot: string): string[] {
  return getImported(pkgroot).filter((d) => d.startsWith('@bemoje/'))
}

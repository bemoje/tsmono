import { getImported } from './getImported'

export function getImportedBemoje(pkgroot: string) {
  return getImported(pkgroot).filter((imp) => imp.startsWith('@bemoje/'))
}

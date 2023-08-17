import { getImported } from './getImported'

export function getImportedExternal(pkgroot: string) {
  return getImported(pkgroot).filter((imp) => !imp.startsWith('.'))
}

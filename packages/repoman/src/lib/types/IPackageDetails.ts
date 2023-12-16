import { Any } from '@bemoje/util'

export interface IPackageDetails {
  name: string
  rootdir: string
  pkgpath: string
  pkg: Any
  owndeps: string[]
  distdir: string
}

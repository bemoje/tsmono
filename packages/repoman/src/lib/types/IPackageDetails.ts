export interface IPackageDetails {
  name: string
  rootdir: string
  pkgpath: string
  pkg: Record<string, any>
  owndeps: string[]
  distdir: string
}

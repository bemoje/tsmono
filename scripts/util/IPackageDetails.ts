export interface IPackageDetails {
  name: string
  rootdir: string
  pkgpath: string
  pkg: Record<string, any>
  deps: string[]
}

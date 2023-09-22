import { readJsonFileSync } from '@bemoje/util'
import path from 'path'
import { INxProjectJson } from '../types/INxProjectJson'
import { IPackageJson } from '../types/IPackageJson'
import { ITSConfig } from '../types/ITSConfig'
import { implicitDependencies } from './implicitDependencies'
import { implicitDependenciesRecursive } from './implicitDependenciesRecursive'
import { implicitDependents } from './implicitDependents'
import { implicitDependentsRecursive } from './implicitDependentsRecursive'

/**
 * A data view for an NX repository app or library package.
 */

export class PackageDataView {
  /**
   * @param name - The name of the package.
   */
  constructor(public name: string) {}

  /**
   * './packages'
   */
  get packagesdir(): string {
    return path.join(process.cwd(), 'packages')
  }

  /**
   * './packages/...<paths>'
   */
  packagesPath(...paths: string[]): string {
    return path.join(this.packagesdir, ...paths)
  }

  /**
   * './packages/...<paths>'
   */
  get rootdir(): string {
    return this.packagesPath(this.name)
  }

  /**
   * './packages/...<paths>'
   */
  rootdirPath(...paths: string[]): string {
    return path.join(this.rootdir, ...paths)
  }

  /**
   * './packages/<name>/package.json'
   */
  get packageJsonPath(): string {
    return this.rootdirPath('package.json')
  }

  /**
   * './packages/<name>/package.json'
   */
  get pkgpath(): string {
    return this.packageJsonPath
  }

  /**
   * './packages/<name>/package.json'
   */
  get projectJsonPath(): string {
    return this.rootdirPath('project.json')
  }

  /**
   * './packages/<name>/tsconfig.json'
   */
  get tsconfigPath(): string {
    return this.rootdirPath('tsconfig.json')
  }

  /**
   * './packages/<name>/tsconfig.lib.json'
   */
  get tsconfigLibPath(): string {
    return this.rootdirPath('tsconfig.lib.json')
  }

  /**
   * './packages/<name>/tsconfig.spec.json'
   */
  get tsconfigSpecPath(): string {
    return this.rootdirPath('tsconfig.spec.json')
  }

  /**
   * './packages/<name>/src'
   */
  get srcdir(): string {
    return this.rootdirPath('src')
  }

  /**
   * './packages/<name>/src/...<paths>'
   */
  srcdirPath(...paths: string[]): string {
    return path.join(this.srcdir, ...paths)
  }

  /**
   * './packages/<name>/src/index.ts'
   */
  get entrypointPath(): string {
    return this.srcdirPath('index.ts')
  }

  /**
   * JSON.parse('./packages/<name>/package.json')
   */
  get packageJson(): IPackageJson {
    return readJsonFileSync(this.packageJsonPath)
  }

  /**
   * JSON.parse('./packages/<name>/package.json')
   */
  get pkg(): IPackageJson {
    return this.packageJson
  }

  /**
   * JSON.parse('./packages/<name>/project.json')
   */
  get projectJson(): INxProjectJson {
    return readJsonFileSync(this.projectJsonPath)
  }

  /**
   * JSON.parse('./packages/<name>/tsconfig.json')
   */
  get tsconfig(): ITSConfig {
    return readJsonFileSync(this.tsconfigPath)
  }

  /**
   * JSON.parse('./packages/<name>/tsconfig.lib.json')
   */
  get tsconfigLib(): ITSConfig {
    return readJsonFileSync(this.tsconfigLibPath)
  }

  /**
   * JSON.parse('./packages/<name>/tsconfig.spec.json')
   */
  get tsconfigSpec(): ITSConfig {
    return readJsonFileSync(this.tsconfigSpecPath)
  }

  /**
   * './dist/packages'
   */
  get distsdir(): string {
    return path.join(process.cwd(), 'dist', 'packages')
  }

  /**
   * './dist/packages/...<paths>'
   */
  distsPath(...paths: string[]): string {
    return path.join(this.distsdir, ...paths)
  }

  /**
   * './dist/packages/<name>'
   */
  get distdir(): string {
    return this.distsPath(this.name)
  }

  /**
   * './dist/packages/<name>/...<paths>'
   */
  distPath(...paths: string[]): string {
    return path.join(this.distdir, ...paths)
  }

  /**
   * './dist/packages/<name>/package.json'
   */
  get distPackageJsonPath(): string {
    return this.distPath('package.json')
  }

  /**
   * JSON.parse('./dist/packages/<name>/package.json')
   */
  get distPackageJson(): IPackageJson {
    return readJsonFileSync(this.distPackageJsonPath)
  }

  /**
   * The names of the packages from user's own mono-repo that this package depends on.
   */
  get owndeps(): string[] {
    return this.implicitDependencies()
  }

  /**
   * The names of the packages from user's own mono-repo that this package depends on.
   */
  implicitDependencies(scoped = false): string[] {
    const deps = implicitDependencies(this.name)
    if (!scoped) return deps
    return deps.map((dep) => `@bemoje/${dep}`)
  }

  /**
   * The names of the packages from user's own mono-repo that this package depends on, recursively.
   */
  implicitDependenciesRecursive(scoped = false): string[] {
    const deps = implicitDependenciesRecursive(this.name)
    if (!scoped) return deps
    return deps.map((dep) => `@bemoje/${dep}`)
  }

  /**
   * The names of the packages from user's own mono-repo that depend on this package.
   */
  implicitDependents(scoped = false): string[] {
    const deps = implicitDependents(this.name)
    if (!scoped) return deps
    return deps.map((dep) => `@bemoje/${dep}`)
  }

  /**
   * The names of the packages from user's own mono-repo that depend on this package, recursively.
   */
  implicitDependentsRecursive(scoped = false): string[] {
    const deps = implicitDependentsRecursive(this.name)
    if (!scoped) return deps
    return deps.map((dep) => `@bemoje/${dep}`)
  }

  /**
   * Get the insatlled version in node_modules of a package.
   */
  installedVersionOf(npmName: string): string {
    const depPackageJsonPath = this.rootdirPath('node_modules', ...npmName.split('/'), 'package.json')
    const depPackageJson = readJsonFileSync(depPackageJsonPath) as IPackageJson
    const depVersion = depPackageJson.version
    if (!depVersion) throw new Error(`Could not find version in '${depPackageJsonPath}'`)
    return depVersion
  }
}

// const v = new PackageDataView('repoman')
// console.log({
//   packagesdir: v.packagesdir,
//   rootdir: v.rootdir,
//   packageJsonPath: v.packageJsonPath,
//   projectJsonPath: v.projectJsonPath,
//   tsconfigPath: v.tsconfigPath,
//   tsconfigLibPath: v.tsconfigLibPath,
//   tsconfigSpecPath: v.tsconfigSpecPath,
//   srcdir: v.srcdir,
//   entrypointPath: v.entrypointPath,
//   packageJson: v.packageJson,
//   // pkg: v.pkg,
//   // projectJson: v.projectJson,
//   // tsconfig: v.tsconfig,
//   // tsconfigLib: v.tsconfigLib,
//   // tsconfigSpec: v.tsconfigSpec,
//   distsdir: v.distsdir,
//   distdir: v.distdir,
//   distPackageJsonPath: v.distPackageJsonPath,
//   // distPackageJson: v.distPackageJson,
//   owndeps: v.owndeps,
// })

// console.log(v.installedVersionOf('@bemoje/util'))

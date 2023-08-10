import fs from 'fs'
import path from 'path'
import { FilePath } from './FilePath'
import { AbstractFsPath } from './core/AbstractFsPath'
import { instantiateCorrectFsPathSubclass } from './core/instantiateCorrectFsPathSubclass'

/**
 * Extension class of AbstractFsObject, which extends the native String class, representing a path to a directory.
 * @see AbstractFsPath
 */
export class DirectoryPath extends AbstractFsPath {
  /**
   * Creates a new DirectoryPath instance.
   * @param dirpath The absolute path to the directory.
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   */
  constructor(dirpath: string, _unsafe = false) {
    super(dirpath, _unsafe)
  }

  /**
   * The absolute path to the directory.
   */
  get dirpath(): string {
    return this.absolute
  }

  /**
   * Returns whether this is an DirectoryPath instance.
   */
  override get isDirectoryPath(): boolean {
    return true
  }

  /**
   * The absolute path to the directory of the filesystem object.
   */
  get parent(): DirectoryPath {
    return new DirectoryPath(this.parentPath)
  }

  /**
   * Returns a new DirectoryPath instance representing a subdirectory of this directory.
   * @param paths The path segments to join to the directory path.
   */
  subdir(...paths: string[]): DirectoryPath {
    return new DirectoryPath(path.join(this.dirpath, ...paths), true)
  }

  /**
   * Returns a new FilePath instance representing a file in this directory.
   * @param filename The name (including extension) of the file.
   */
  file(filename: string): FilePath {
    return new FilePath(path.join(this.dirpath, filename), true)
  }

  /**
   * Synchronously reads the directory with fs.readdir and returns its contents as as FsObject instances.
   * @throws If the path does not exist.
   */
  readdirSync(): AbstractFsPath[] {
    return fs.readdirSync(this.dirpath).map((filename: string) => {
      const absolute = path.join(this.dirpath, filename)
      const stat = fs.statSync(absolute)
      return instantiateCorrectFsPathSubclass(absolute, stat)
    })
  }

  /**
   * Asynchronously reads the directory with fs.promises.readdir and returns its contents as as FsObject instances.
   * @throws If the path does not exist.
   */
  async readdir(): Promise<AbstractFsPath[]> {
    return await Promise.all(
      (await fs.promises.readdir(this.dirpath)).map(async (filename: string) => {
        const absolute = path.join(this.dirpath, filename)
        const stat = await fs.promises.stat(absolute)
        return instantiateCorrectFsPathSubclass(absolute, stat)
      }),
    )
  }
}

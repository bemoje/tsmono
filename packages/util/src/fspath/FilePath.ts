import fs from 'fs'
import path from 'path'
import { AbstractFsPath } from './core/AbstractFsPath'
import { BlockDevicePath } from './core/BlockDevicePath'
import { CharacterDevicePath } from './core/CharacterDevicePath'
import { FIFOPath } from './core/FIFOPath'
import { SocketPath } from './core/SocketPath'
import { SymbolicLinkPath } from './core/SymbolicLinkPath'
import { NodeJsBufferEncoding } from './types/NodeJsBufferEncoding'

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
      (
        await fs.promises.readdir(this.dirpath)
      ).map(async (filename: string) => {
        const absolute = path.join(this.dirpath, filename)
        const stat = await fs.promises.stat(absolute)
        return instantiateCorrectFsPathSubclass(absolute, stat)
      })
    )
  }
}

/**
 * Extension class of AbstractFsObject, which extends the native String class, representing a path to a file.
 * @see AbstractFsPath
 */
export class FilePath extends AbstractFsPath {
  /**
   * Creates a new FilePath instance.
   * @param filepath The absolute path
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   */
  constructor(filepath: string, _unsafe = false) {
    super(filepath, _unsafe)
  }

  /**
   * Returns whether this is an FilePath instance.
   */
  override get isFilePath(): boolean {
    return true
  }

  /**
   * The absolute path to the directory of the filesystem object.
   */
  get parent(): DirectoryPath {
    return new DirectoryPath(this.parentPath, true)
  }

  /**
   * The absolute path to the file.
   */
  get filepath(): string {
    return this.absolute
  }

  /**
   * The filename (including the file extension).
   */
  get filename(): string {
    return path.basename(this.filepath)
  }

  /**
   * The file extension of the source file.
   * @returns The file extension, including the leading dot.
   */
  get extension(): string {
    return path.extname(this.filepath)
  }

  /**
   * Read the file synchronously with fs.readFileSync.
   * @param encoding The encoding to use. If none is specified, a Buffer is returned.
   */
  readFileSync(encoding?: NodeJsBufferEncoding): string | Buffer {
    return fs.readFileSync(this.filepath, encoding)
  }

  /**
   * Read the file asynchronously with fs.promises.readFile.
   * @param encoding The encoding to use. If none is specified, a Buffer is returned.
   */
  async readFile(encoding?: NodeJsBufferEncoding): Promise<string | Buffer> {
    return fs.promises.readFile(this.filepath, encoding)
  }

  /**
   * Read the file synchronously as a string with fs.readFileSync.
   * @param encoding The encoding to use. Defaults to 'utf8'.
   */
  readFileStringSync(encoding: NodeJsBufferEncoding = 'utf8'): string {
    return fs.readFileSync(this.filepath, encoding)
  }

  /**
   * Read the file asynchronously as a string with fs.promises.readFile.
   * @param encoding The encoding to use. Defaults to 'utf8'.
   */
  async readFileString(encoding: NodeJsBufferEncoding = 'utf8'): Promise<string> {
    return fs.promises.readFile(this.filepath, encoding)
  }

  /**
   * Write or overwrite the file synchronously with fs.writeFileSync.
   * If the directory path does not exist, it is created and no error is thrown.
   * @param data A string or Buffer to write to the file.
   * @param encoding The encoding to use. Defaults to 'utf8'.
   */
  writeFileSync(data: string | NodeJS.ArrayBufferView, encoding: NodeJsBufferEncoding = 'utf8'): void {
    fs.mkdirSync(this.parentPath, { recursive: true })
    fs.writeFileSync(this.filepath, data, encoding)
  }

  /**
   * Write or overwrite the file asynchronously with fs.promises.writeFile.
   * If the directory path does not exist, it is created and no error is thrown.
   * @param data A string or Buffer to write to the file.
   * @param encoding The encoding to use. Defaults to 'utf8'.
   */
  async writeFile(data: string | NodeJS.ArrayBufferView, encoding: NodeJsBufferEncoding = 'utf8'): Promise<void> {
    await fs.promises.mkdir(this.parentPath, { recursive: true })
    await fs.promises.writeFile(this.filepath, data, encoding)
  }
}

/**
 * Creates a new FsObject instance of the correct type.
 * @param absolute The absolute path to the filesystem object.
 * @param stat The fs.Stats object of the filesystem object.
 * @returns an instance of the correct subclass of @see AbstractFsPath.
 */
export function instantiateCorrectFsPathSubclass(absolute: string, stat: fs.Stats): AbstractFsPath {
  if (stat.isFile()) return new FilePath(absolute, true)
  if (stat.isDirectory()) return new DirectoryPath(absolute, true)
  if (stat.isSymbolicLink()) return new SymbolicLinkPath(absolute, true)
  if (stat.isBlockDevice()) return new BlockDevicePath(absolute, true)
  if (stat.isCharacterDevice()) return new CharacterDevicePath(absolute, true)
  if (stat.isFIFO()) return new FIFOPath(absolute, true)
  return new SocketPath(absolute, true)
}

import fs from 'fs'
import path from 'path'
import { DirectoryPath } from './DirectoryPath'
import { AbstractFsPath } from './core/AbstractFsPath'
import { NodeJsBufferEncoding } from './types/NodeJsBufferEncoding'

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

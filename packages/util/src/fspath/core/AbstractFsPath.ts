import fs from 'fs'
import path from 'path'
import { absoluteToRelativePath } from '../../fs/absoluteToRelativePath'
import { assertValidWindowsPath } from '../../fs/assertValidWindowsPath'

/**
 * Abstract extension of the native String class, representing a path to a filesystem object, such as directory or file.
 * Some of the classes extending this one are @see DirectoryPath or @see FilePath
 */
export abstract class AbstractFsPath extends String {
  /**
   * @param absolute The absolute path to the filesystem object either as a string or an array of path segments.
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   * @throws If the path is not absolute.
   */
  protected constructor(absolute: string | string[], _unsafe = false) {
    if (_unsafe) {
      super(absolute as string)
      return
    }
    if (typeof absolute !== 'string') {
      absolute = path.join(...absolute)
    }
    if (!absolute || !path.isAbsolute(absolute)) {
      throw new Error(`Expected absolute filepath. Got: ${absolute}`)
    }
    super(path.normalize(absolute))
  }

  override valueOf(): string {
    return String(this)
  }

  get absolute(): string {
    return String(this)
  }

  /**
   * The relative path to the filesystem object from the working directory.
   */
  get relative(): string {
    return absoluteToRelativePath(this.absolute)
  }

  /**
   * The root directory of the disk containing the filesystem object.
   */
  get root(): string {
    return path.parse(this.absolute).root
  }

  /**
   * The file/directory name (for files, including the file extension).
   */
  get base(): string {
    return path.basename(this.absolute)
  }

  /**
   * The file/directory name (for files, not including the file extension).
   */
  get name(): string {
    return path.parse(this.absolute).name
  }

  /**
   * The absolute path to the directory of the filesystem object.
   */
  get parentPath(): string {
    return path.dirname(this.absolute)
  }

  /**
   * Returns whether the file exists.
   */
  get exists(): boolean {
    return fs.existsSync(this.absolute)
  }

  /**
   * Get fs.Stats synchronously
   */
  statSync(): fs.Stats {
    return fs.statSync(this.absolute)
  }

  /**
   * Get fs.Stats asynchronously
   */
  async stat(): Promise<fs.Stats> {
    return fs.promises.stat(this.absolute)
  }

  /**
   * Returns whether the path is valid on Windows.
   * @param extendedMaxLength If true, we are assuming the OS configuration allows paths to be up to 32767 characters long.
   */
  isValidWindowsPath(extendedMaxLength = false): boolean {
    return assertValidWindowsPath(this.absolute, { extendedMaxLength })
  }

  /**
   * Split the absolute path into an array of path segments.
   */
  toArray(): string[] {
    return this.absolute.split(path.sep)
  }

  /**
   * Split the relative path into an array of path segments.
   * @see relative
   */
  relativeToArray(): string[] {
    return this.relative.split(path.sep)
  }

  /**
   * Returns whether this is an DirectoryPath instance.
   */
  get isDirectoryPath(): boolean {
    return false
  }

  /**
   * Returns whether this is an FilePath instance.
   */
  get isFilePath(): boolean {
    return false
  }

  /**
   * Returns whether this is an BlockDevicePath instance.
   */
  get isBlockDevicePath(): boolean {
    return false
  }

  /**
   * Returns whether this is an FsSymbolcLink instance.
   */
  get isSymbolicLinkPath(): boolean {
    return false
  }

  /**
   * Returns whether this is an CharacterDevicePath instance.
   */
  get isCharacterDevicePath(): boolean {
    return false
  }

  /**
   * Returns whether this is an FIFOPath instance.
   */
  get isFIFOPath(): boolean {
    return false
  }

  /**
   * Returns whether this is an SocketPath instance.
   */
  get isSocketPath(): boolean {
    return false
  }

  /**
   * Returns whether this actually is a path to a directory.
   * @param stat The fs.Stats object to check. If not provided, it is retrieved synchronously.
   * @throws If the path does not exist.
   */
  isDirectory(stat: fs.Stats = this.statSync()): boolean {
    return stat.isDirectory()
  }

  /**
   * Returns whether this actually is a path to a file.
   * @param stat The fs.Stats object to check. If not provided, it is retrieved synchronously.
   * @throws If the path does not exist.
   */
  isFile(stat: fs.Stats = this.statSync()): boolean {
    return stat.isFile()
  }

  /**
   * Returns whether this actually is a path to a block device.
   * @param stat The fs.Stats object to check. If not provided, it is retrieved synchronously.
   * @throws If the path does not exist.
   */
  isBlockDevice(stat: fs.Stats = this.statSync()): boolean {
    return stat.isBlockDevice()
  }

  /**
   * Returns whether this actually is a path to a symbolic link.
   * @param stat The fs.Stats object to check. If not provided, it is retrieved synchronously.
   * @throws If the path does not exist.
   */
  isSymbolicLink(stat: fs.Stats = this.statSync()): boolean {
    return stat.isSymbolicLink()
  }

  /**
   * Returns whether this actually is a path to a character device.
   * @param stat The fs.Stats object to check. If not provided, it is retrieved synchronously.
   * @throws If the path does not exist.
   */
  isCharacterDevice(stat: fs.Stats = this.statSync()): boolean {
    return stat.isCharacterDevice()
  }

  /**
   * Returns whether this actually is a path to a FIFO device.
   * @param stat The fs.Stats object to check. If not provided, it is retrieved synchronously.
   * @throws If the path does not exist.
   */
  isFIFO(stat: fs.Stats = this.statSync()): boolean {
    return stat.isFIFO()
  }

  /**
   * Returns whether this actually is a path to a socket.
   * @param stat The fs.Stats object to check. If not provided, it is retrieved synchronously.
   * @throws If the path does not exist.
   */
  isSocket(stat: fs.Stats = this.statSync()): boolean {
    return stat.isSocket()
  }
}

import { AbstractFsPath } from './AbstractFsPath'

/**
 * Extension class of AbstractFsObject, which extends the native String class, representing a path to a symbolic link.
 * @see AbstractFsPath
 * @remarks
 * This is a file that points to another file or directory. It's a reference or shortcut.
 * This class has no special methods or properties. It is only used to distinguish between different types of filesystem objects.
 */
export class SymbolicLinkPath extends AbstractFsPath {
  /**
   * Creates a new SymbolicLinkPath instance.
   * @param abolsute The absolute path.
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   */
  constructor(absolute: string, _unsafe = false) {
    super(absolute, _unsafe)
  }

  /**
   * Returns whether this is an SymbolcLinkPath instance.
   */
  override get isSymbolicLinkPath(): boolean {
    return true
  }
}

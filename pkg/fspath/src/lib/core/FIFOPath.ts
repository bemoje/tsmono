import { AbstractFsPath } from './AbstractFsPath'

/**
 * Extension class of AbstractFsObject, which extends the native String class, representing a path to a FIFO.
 * @see AbstractFsPath
 * @remarks
 * FIFO stands for First In, First Out and refers to a method for organizing and manipulating a data buffer. It's a special type of file which is used for interprocess communication.
 * This class has no special methods or properties. It is only used to distinguish between different types of filesystem objects.
 */
export class FIFOPath extends AbstractFsPath {
  /**
   * Creates a new FIFOPath instance.
   * @param abolsute The absolute path.
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   */
  constructor(absolute: string, _unsafe = false) {
    super(absolute, _unsafe)
  }

  /**
   * Returns whether this is an FIFOPath instance.
   */
  override get isFIFOPath(): boolean {
    return true
  }
}

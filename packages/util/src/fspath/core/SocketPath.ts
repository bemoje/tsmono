import { AbstractFsPath } from './AbstractFsPath'

/**
 * Extension class of AbstractFsObject, which extends the native String class, representing a path to a socket.
 * @see AbstractFsPath
 * @remarks
 * This is a special file used for inter-process communication. It provides a communication interface between a client process and a server process.
 * This class has no special methods or properties. It is only used to distinguish between different types of filesystem objects.
 */
export class SocketPath extends AbstractFsPath {
  /**
   * Creates a new SocketPath instance.
   * @param abolsute The absolute path.
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   */
  constructor(absolute: string, _unsafe = false) {
    super(absolute, _unsafe)
  }

  /**
   * Returns whether this is an SocketPath instance.
   */
  override get isSocketPath(): boolean {
    return true
  }
}

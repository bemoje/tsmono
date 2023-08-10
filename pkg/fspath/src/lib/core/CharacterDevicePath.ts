import { AbstractFsPath } from './AbstractFsPath'

/**
 * Extension class of AbstractFsObject, which extends the native String class, representing a path to a character device.
 * @see AbstractFsPath
 * @remarks
 * This represents a device file that provides unbuffered I/O access in variable block sizes. Character devices might correspond to hardware like keyboards or mice.
 * This class has no special methods or properties. It is only used to distinguish between different types of filesystem objects.
 */
export class CharacterDevicePath extends AbstractFsPath {
  /**
   * Creates a new CharacterDevicePath instance.
   * @param abolsute The absolute path.
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   */
  constructor(absolute: string, _unsafe = false) {
    super(absolute, _unsafe)
  }

  /**
   * Returns whether this is an CharacterDevicePath instance.
   */
  override get isCharacterDevicePath(): boolean {
    return true
  }
}

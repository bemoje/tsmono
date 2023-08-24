import { AbstractFsPath } from './AbstractFsPath'

/**
 * Extension class of AbstractFsObject, which extends the native String class, representing a path to a block device.
 * @see AbstractFsPath
 * @remarks
 * This represents a device file that provides buffered I/O access in fixed-size blocks. Block devices usually correspond to devices with data storage like hard drives.
 * This class has no special methods or properties. It is only used to distinguish between different types of filesystem objects.
 */
export class BlockDevicePath extends AbstractFsPath {
  /**
   * Creates a new BlockDevicePath instance.
   * @param abolsute The absolute path.
   * @param _unsafe Used internally changing it is not recommended. If true, the path is not checked for whether it is actually absolute, it is not normalized and it is assumed to be of type string.
   */
  constructor(absolute: string, _unsafe = false) {
    super(absolute, _unsafe)
  }

  /**
   * Returns whether this is an BlockDevicePath instance.
   */
  override get isBlockDevicePath(): boolean {
    return true
  }
}

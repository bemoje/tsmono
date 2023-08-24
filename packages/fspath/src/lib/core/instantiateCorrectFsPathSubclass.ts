import fs from 'fs'
import { DirectoryPath } from '../DirectoryPath'
import { FilePath } from '../FilePath'
import { AbstractFsPath } from './AbstractFsPath'
import { BlockDevicePath } from './BlockDevicePath'
import { CharacterDevicePath } from './CharacterDevicePath'
import { FIFOPath } from './FIFOPath'
import { SocketPath } from './SocketPath'
import { SymbolicLinkPath } from './SymbolicLinkPath'

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

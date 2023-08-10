import { createDirectory } from './createDirectory'
import { deleteDirectorySafe } from './deleteDirectorySafe'

export async function wipeDirectorySafe(dirpath: string) {
  await deleteDirectorySafe(dirpath)
  await createDirectory(dirpath)
}

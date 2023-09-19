import { deleteDirectorySafeSync } from '@bemoje/util'
import { INDEX_DATA_DIRPATH } from '../constants/INDEX_DATA_DIRPATH'

export function wipeIndex(): void {
  deleteDirectorySafeSync(INDEX_DATA_DIRPATH)
}

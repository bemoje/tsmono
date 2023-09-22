import { deleteFsoSafeSync } from '@bemoje/util'
import { INDEX_DATA_DIRPATH } from '../constants/INDEX_DATA_DIRPATH'

export function wipeIndex(): void {
  deleteFsoSafeSync(INDEX_DATA_DIRPATH)
}

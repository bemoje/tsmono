import { INDEX_DATA_DIRPATH } from '../../constants/lib/INDEX_DATA_DIRPATH'
import { removeFileSync } from '@bemoje/util'

export function wipeIndex(): void {
  removeFileSync(INDEX_DATA_DIRPATH)
}

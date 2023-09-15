import fs from 'fs'
import { FILE_LIST_PATH } from '../constants/FILE_LIST_PATH'
import { WORD_TRIE_PATH } from '../constants/WORD_TRIE_PATH'

export function wipeIndex(): void {
  fs.rmSync(FILE_LIST_PATH, { force: true })
  fs.rmSync(WORD_TRIE_PATH, { force: true })
}

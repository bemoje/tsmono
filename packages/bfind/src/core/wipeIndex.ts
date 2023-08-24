import fs from 'fs'
import { FILE_LIST_JSON_PATH } from '../constants/FILE_LIST_JSON_PATH'
import { WORD_TRIE_JSON_PATH } from '../constants/WORD_TRIE_JSON_PATH'

export function wipeIndex(): void {
  fs.rmSync(FILE_LIST_JSON_PATH, { force: true })
  fs.rmSync(WORD_TRIE_JSON_PATH, { force: true })
}

import path from 'path'
import { APPDATA_PATH } from './APPDATA_PATH'

export const WORD_TRIE_JSON_PATH: string = path.join(APPDATA_PATH, 'index', 'words.json')

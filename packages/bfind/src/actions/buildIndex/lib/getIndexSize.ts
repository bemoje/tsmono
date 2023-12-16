import fsp from 'fs-extra'
import path from 'path'
import { arrSum, bytesToMegabytes, round } from '@bemoje/util'
import { FILE_LIST_FILEPATH } from '../../../constants/lib/FILE_LIST_FILEPATH'
import { WORD_TRIE_DIRPATH } from '../../../constants/lib/WORD_TRIE_DIRPATH'

export async function getIndexSize(): Promise<number> {
  const trieFnames = await fsp.readdir(WORD_TRIE_DIRPATH)
  const trieFsizes = await Promise.all(
    trieFnames.map(async (fname) => {
      return (await fsp.stat(path.join(WORD_TRIE_DIRPATH, fname))).size
    })
  )
  const trieSize = arrSum(trieFsizes)
  const pathsSize = (await fsp.stat(FILE_LIST_FILEPATH)).size
  return round(bytesToMegabytes(pathsSize + trieSize))
}

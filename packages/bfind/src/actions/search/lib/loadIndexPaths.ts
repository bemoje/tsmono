import fs from 'fs-extra'
import { FILE_LIST_FILEPATH } from '../../../constants/lib/FILE_LIST_FILEPATH'
import { gracefulProcessExit } from '../../../util/lib/gracefulProcessExit'
import { readJsonFile } from '@bemoje/util'

export async function loadIndexPaths(): Promise<string[]> {
  if (!fs.existsSync(FILE_LIST_FILEPATH)) {
    gracefulProcessExit('Index not found. Run `bfind index` to build the index.')
  }
  return await readJsonFile(FILE_LIST_FILEPATH)
}

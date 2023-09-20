import { gracefulProcessExit } from '@bemoje/commander-config'
import { readJsonFile } from '@bemoje/util'
import fs from 'fs'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'

export async function loadIndexPaths(): Promise<string[]> {
  if (!fs.existsSync(FILE_LIST_FILEPATH)) {
    gracefulProcessExit('Index not found. Run `bfind index` to build the index.')
  }
  return await readJsonFile(FILE_LIST_FILEPATH)
}

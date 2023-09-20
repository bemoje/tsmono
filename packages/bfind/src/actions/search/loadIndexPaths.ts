import { gracefulProcessExit } from '@bemoje/commander-config'
import fs from 'fs'
import fsp from 'fs/promises'
import { FILE_LIST_FILEPATH } from '../../constants/FILE_LIST_FILEPATH'

export async function loadIndexPaths(): Promise<string[]> {
  if (!fs.existsSync(FILE_LIST_FILEPATH)) {
    gracefulProcessExit('Index not found. Run `bfind index` to build the index.')
  }
  return JSON.parse(await fsp.readFile(FILE_LIST_FILEPATH, 'utf8')) as string[]
}

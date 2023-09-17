import { colors } from '@bemoje/util'
import fs from 'fs'
import { FILE_LIST_FILEPATH } from '../../../constants/FILE_LIST_FILEPATH'

export function printIndexAge() {
  const indexAge = Math.floor((Date.now() - fs.statSync(FILE_LIST_FILEPATH).mtimeMs) / 1000 / 60 / 60 / 24)
  const color = indexAge > 7 ? colors.red : indexAge > 3 ? colors.yellow : colors.green
  console.log(`Files last indexed ${color(indexAge.toString())} days ago.\n`)
}

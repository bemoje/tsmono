import colors from 'ansi-colors'
import fs from 'fs-extra'
import { FILE_LIST_FILEPATH } from '../../../../constants/lib/FILE_LIST_FILEPATH'

export function printIndexAge() {
  const indexAge = Math.floor((Date.now() - fs.statSync(FILE_LIST_FILEPATH).mtimeMs) / 1000 / 60 / 60 / 24)
  if (indexAge < 1) return
  const color = indexAge > 7 ? colors.red : indexAge > 3 ? colors.yellow : colors.magenta
  console.log(`Files last indexed ${color(indexAge.toString())} days ago.`)
}

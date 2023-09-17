import { getAppDataPath } from '@bemoje/util'
import path from 'path'

export const APPDATA_DIRPATH: string = path.join(getAppDataPath(), 'bemoje', 'bfind')

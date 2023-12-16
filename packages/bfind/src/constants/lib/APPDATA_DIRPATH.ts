import path from 'path'
import { getAppDataPath } from '@bemoje/util'

export const APPDATA_DIRPATH: string = path.join(getAppDataPath(), 'bemoje', 'bfind')

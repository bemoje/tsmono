import { getAppDataPath } from '@bemoje/util'
import path from 'path'

export const APPDATA_PATH: string = path.join(getAppDataPath(), 'bemoje', 'bfind')

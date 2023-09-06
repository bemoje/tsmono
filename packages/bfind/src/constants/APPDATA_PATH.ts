import { getAppDataPath } from '@bemoje/os'
import path from 'path'

export const APPDATA_PATH: string = path.join(getAppDataPath(), 'bemoje', 'bfind')

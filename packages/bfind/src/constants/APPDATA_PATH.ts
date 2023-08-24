import getAppDataPath from 'appdata-path'
import path from 'path'

export const APPDATA_PATH: string = path.join(getAppDataPath(), 'bemoje', 'bfind')

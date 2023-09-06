import os from 'os'
import path from 'path'
import { getOS } from './getOS'

export function getAppDataPath(appName?: string, ...subdirs: string[]) {
  let appDataPath = process.env['APPDATA']
  if (!appDataPath) {
    const OS = getOS()
    if (OS === 'windows') {
      appDataPath = path.join(os.homedir(), 'AppData', 'Roaming')
    } else if (OS === 'osx') {
      appDataPath = path.join(os.homedir(), 'Library', 'Application Support')
    } else if (OS === 'linux') {
      appDataPath = path.join(os.homedir(), '.config')
    } else {
      throw new Error('Could not find an appropriate app data path')
    }
  }
  if (!appName) return appDataPath
  if (appDataPath === os.homedir()) appName = '.' + appName
  return path.join(appDataPath, appName, ...subdirs)
}

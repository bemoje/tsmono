import { getAppDataPath } from '@bemoje/util'
import path from 'path'
import { JsonFile } from './JsonFile'
import { LogFile } from './LogFile'
import { ILogFileData } from './types/ILogFileData'

export class AppData<A extends Record<string, unknown>, C extends Record<string, unknown>> {
  directory: string
  app: JsonFile<A>
  user: JsonFile<C>
  history: LogFile<ILogFileData<C>>

  constructor(appAuthor: string, appName: string, configName: string) {
    this.directory = path.join(getAppDataPath(), appAuthor, appName, configName)
    this.app = new JsonFile(path.join(this.directory, 'appdata.json'), false)
    this.user = new JsonFile(path.join(this.directory, 'config.json'), true)
    this.history = new LogFile(path.join(this.directory, 'history.log'))
    this.app.on('set', async (time, k: string, v: C) => {
      await this.history.append({ source: 'app', key: k, value: v }, time)
    })
    this.user.on('set', async (time, k: string, v: C) => {
      await this.history.append({ source: 'user', key: k, value: v }, time)
    })
  }
}

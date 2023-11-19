import path from 'path'
import { getAppDataPath } from '../path/getAppDataPath'
import { ILogFileData } from './types/ILogFileData'
import { JsonFile } from './JsonFile'
import { LogFile } from './LogFile'

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

interface IAppData<A extends Record<string, unknown>, C extends Record<string, unknown>> {
  directory: string
  app: JsonFile<A>
  user: JsonFile<C>
}

export class AppData2<A extends Record<string, unknown>, C extends Record<string, unknown>> implements IAppData<A, C> {
  readonly directory: string

  constructor(appAuthor: string, appName: string, configName: string) {
    this.directory = path.join(getAppDataPath(), appAuthor, appName, configName)
  }

  get app(): JsonFile<A> {
    Object.defineProperty(this, 'app', {
      enumerable: true,
      writable: false,
      value: new JsonFile<A>(path.join(this.directory, 'appdata.json'), false),
    })
    return this.app
  }

  get user(): JsonFile<C> {
    Object.defineProperty(this, 'user', {
      enumerable: true,
      writable: false,
      value: new JsonFile<C>(path.join(this.directory, 'config.json'), true),
    })
    return this.user
  }
}

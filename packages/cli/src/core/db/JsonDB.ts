import {
  assertThat,
  funAsyncRateLimit,
  isObject,
  JsonObject,
  JsonValue,
  readJsonFileSafeSync,
  writeJsonFileSafe,
} from '@bemoje/util'
import { Base } from '../CommandBuilder/Base'
import { getJsonFilepath } from '../util/getJsonFilepath'
import { JsonFile } from './JsonFile'

export class JsonDB extends Base {
  protected data: JsonObject
  readonly save: () => void

  /**
   * @param filepath The path to the JSON file.
   */
  constructor(protected readonly file: JsonFile) {
    super()
    this.data = readJsonFileSafeSync(this.filepath) ?? {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [queue, writeJsonFileSafeLimited] = funAsyncRateLimit(writeJsonFileSafe, {
      concurrency: 1,
      autoStart: true,
      timeout: 3000,
      throwOnTimeout: true,
    })
    const opts = { spaces: 2 }
    this.save = () => {
      writeJsonFileSafeLimited(this.filepath, this.data, opts).catch((err) => {
        this.file.cmd.outputUserError(err?.message || String(err))
      })
    }
    // const cmdr = getCommander(this.file.cmd)
    // const awaitQueue = async () => await queue.onIdle()
    // process.on('exit', awaitQueue)
    // cmdr.exitOverride(awaitQueue)
  }

  get filepath() {
    return getJsonFilepath(this.file.cmd)
  }

  set(prefix?: string, value: JsonValue = {}, save = true) {
    if (!prefix) {
      this.data = assertThat(value, isObject) as JsonObject
    } else {
      const keys = prefix.split('.')
      const lastKey = keys.pop() as string
      let node: JsonObject = this.data
      for (const key of keys) {
        if (!Object.hasOwn(node, key)) {
          node[key] = {}
        }
        node = node[key] as JsonObject
      }
      node[lastKey] = this.cloneDeep(value)
    }
    if (save) this.save()
  }

  get<T = JsonValue>(prefix?: string): T {
    const value = this.getSafe<T>(prefix)
    if (value === undefined) throw new Error(`No config entry with key '${prefix}'`)
    return value
  }

  getSafe<T = JsonValue>(prefix?: string): T | undefined {
    if (!prefix) return this.cloneDeep(this.data) as T
    const keys = prefix.split('.')
    let node: JsonObject = this.data
    for (const key of keys) {
      if (!Object.hasOwn(node, key)) {
        return undefined
      }
      node = node[key] as JsonObject
    }
    return this.cloneDeep(node) as T
  }

  has(prefix?: string) {
    if (!prefix) return true
    return this.getSafe(prefix) !== undefined
  }

  delete(prefix?: string, save = true) {
    if (!prefix) {
      this.data = {}
    } else {
      const keys = prefix.split('.')
      const lastKey = keys.pop() as string
      let node: JsonObject = this.data
      for (const key of keys) {
        if (!Object.hasOwn(node, key)) {
          return
        }
        node = node[key] as JsonObject
      }
      delete node[lastKey]
    }
    if (save) this.save()
  }

  protected cloneDeep(obj: JsonValue) {
    return JSON.parse(JSON.stringify(obj))
  }
}

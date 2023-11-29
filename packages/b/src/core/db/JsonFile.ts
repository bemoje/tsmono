import fs from 'fs-extra'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { ConfigSection } from './ConfigSection'
import { JsonDB } from './JsonDB'
import { PresetsSection } from './PresetsSection'
import { realizeLazyProperty } from '../util/realizeLazyProperty'

/**
 * A class that represents the JSON file used as a simple database.
 */
export class JsonFile {
  db: JsonDB

  /**
   * @param cmd The parent CommandBuilder instance.
   */
  constructor(public readonly cmd: CommandBuilder) {
    this.db = new JsonDB(this)
  }

  /**
   * A lazy-loaded instance of the `config` section of the JSON file.
   * Upon first property access, it is stored as a property on the instance.
   */
  get config() {
    return realizeLazyProperty(this, 'config', new ConfigSection(this, 'config'))
  }

  /**
   * A lazy-loaded instance of the `presets` section of the JSON file.
   */
  get presets() {
    return realizeLazyProperty(this, 'presets', new PresetsSection(this, 'presets'))
  }
}

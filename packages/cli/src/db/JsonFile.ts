import { AppDataSection } from './AppDataSection'
import { CommandBuilder } from '../cmd/CommandBuilder'
import { ConfigSection } from './ConfigSection'
import { JsonDB, realizeLazyProperty } from '@bemoje/util'
import { PresetsSection } from './PresetsSection'

/**
 * A class that represents the JSON file used as a simple database.
 */
export class JsonFile {
  /**
   * @param cmd The parent CommandBuilder instance.
   */
  constructor(readonly cmd: CommandBuilder) {}

  /**
   * A lazy-loaded instance of the JsonDB instance containing the data.
   * Upon first property access, it is stored as a property on the instance.
   * If the command is a subcommand, the root command's JsonDB instance is returned.
   */
  get db(): JsonDB {
    if (this.cmd.isRoot) {
      return realizeLazyProperty(this, 'db', new JsonDB(this.cmd.jsonFilepath, 2))
    } else {
      return this.cmd.root.db.db
    }
  }

  /**
   * A lazy-loaded instance of the `config` section of the JSON file.
   * Upon first property access, it is stored as a property on the instance.
   */
  get config(): ConfigSection {
    return realizeLazyProperty(this, 'config', new ConfigSection(this, 'config'))
  }

  /**
   * A lazy-loaded instance of the `appData` section of the JSON file.
   * Upon first property access, it is stored as a property on the instance.
   */
  get appData(): AppDataSection {
    return realizeLazyProperty(this, 'appData', new AppDataSection(this, 'appData'))
  }

  /**
   * A lazy-loaded instance of the `presets` section of the JSON file.
   */
  get presets(): PresetsSection {
    return realizeLazyProperty(this, 'presets', new PresetsSection(this, 'presets'))
  }
}

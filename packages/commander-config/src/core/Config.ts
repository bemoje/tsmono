/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppData, readJsonFileSync } from '@bemoje/fs'
import { cyan, green } from 'cli-color'
import { Command } from 'commander'
import fs from 'fs'
import { getUserInputFromEditorSync } from '../util/getUserInputFromEditorSync'
import { parseString } from '../util/parseString'
import { validateString } from '../util/validateString'
import { IConfigSetting } from './IConfigSetting'
import { IConfigSettings } from './IConfigSettings'

/**
 * A utility class for managing user configuration settings when using the 'commander' package to create CLI's.
 */
export class Config {
  /**
   * An AppData instance that manages both an appdata file, a user config file and a log file.
   */
  readonly appdata: AppData<Record<string, any>, Record<string, any>>

  /**
   * Objects that define each setting of the user config.
   */
  readonly definitions: IConfigSettings

  /**
   * Creates a new Config instance.
   * @param appAuthor - The name of the author of the application.
   * @param appName - The name of the application.
   * @param definitions - Objects that define each setting of the user config.
   */
  constructor(appAuthor: string, appName: string, definitions: Record<string, IConfigSetting>) {
    definitions = {
      editor: {
        description: 'application launch command for your preferred text editor.',
        default: 'code -w',
        parse: parseString,
        validate: validateString,
      },
      ...definitions,
    }

    this.appdata = new AppData<Record<string, any>, Record<string, any>>(appAuthor, appName, 'appdata')

    this.definitions = definitions as IConfigSettings

    const currentUserConfig = readJsonFileSync(this.appdata.user.filepath) as Record<string, any>
    this.appdata.user.assign(currentUserConfig)

    const currentAppData = readJsonFileSync(this.appdata.app.filepath) as Record<string, any>
    this.appdata.app.assign(currentAppData)

    for (const [name, options] of Object.entries(definitions)) {
      this.appdata.user.getOrElse(name, () => options.default)
    }

    this.appdata.user.on('set', (time, k: string, v: Record<string, any>) => {
      if (this.definitions[k]) {
        const validate = this.definitions[k].validate
        if (validate) validate(k, v)
      }
    })
  }

  /**
   * Edits the user configuration in the editor.
   */
  editConfigInEditor(): void {
    const newJson = getUserInputFromEditorSync({
      appdataDirectory: this.appdata.directory,
      editor: this.appdata.user.data.editor,
      currentContent: JSON.stringify(this.appdata.user.data, null, 2),
      extension: '.json',
    })
    this.appdata.user.assign(JSON.parse(newJson) as Record<string, any>)
    console.log('Configuration updated.')
  }

  /**
   * Initializes the configuration settings.
   * @param program - The Commander program instance.
   */
  initialize(program: Command): void {
    program
      .command('appdata')
      .description(cyan('Get the directory containing your app data.'))
      .action((options: { wipe?: boolean } = {}) => {
        console.log('APPDATA: ' + this.appdata.directory)
        console.log(options)
        if (options.wipe) {
          fs.rmdirSync(this.appdata.directory, { recursive: true })
          console.log('All app data deleted.')
        }
      })

    program
      .command('config')
      .description(cyan(['User configuration settings.'].join('\r')))
      .argument('[action]', 'The action to perform. Accepted values are: edit, reset, set.')
      .argument(
        '[setting]',
        [
          'The name of the setting. If reset is selected and this is omitted, ALL settings are reset.',
          ...Object.entries(this.definitions).map(([name, def]) => `${green(name)}: ${def.description}`),
        ].join('\n')
      )
      .argument('[value]', 'The value to assign.')
      .action((action?: string, setting?: string, value?: string) => {
        if (!action || action === 'edit') return this.editConfigInEditor()
        if (action === 'reset') return this.reset(setting)
        if (action === 'set') {
          if (!setting || !value) {
            console.error('Both setting and value must be provided.')
            process.exit(1)
          }
          return this.set(setting, value)
        }
        console.error(action + ' is not a valid action.')
        process.exit(1)
      })
  }

  /**
   * Sets a configuration setting.
   * @param setting - The name of the setting.
   * @param value - The value to assign.
   */
  set(setting: string, value: string): void {
    const definition = this.definitions[setting]
    if (!definition) {
      return console.log(`The '${setting}' setting not recognized.`)
    }
    this.appdata.user.set(setting, definition.parse(value || JSON.stringify(this)))
    console.log(`The '${setting}' setting has been configured.`)
  }

  /**
   * Resets a configuration setting.
   * @param setting - The name of the setting. If omitted, all settings are reset.
   */
  reset(setting?: string): void {
    if (!setting) {
      fs.rmSync(this.appdata.user.filepath)
      console.log('All app data deleted.')
      process.exit(0)
    }
    const definition = this.definitions[setting]
    if (!definition) {
      return console.log(`The '${setting}' setting not recognized.`)
    }
    if (this.appdata.user.get(setting) !== definition.default) {
      this.appdata.user.set(setting, definition.default)
      console.log(`The '${setting}' setting has been reset to its default value.`)
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppData, colors, isOSX, isVsCodeInstalled, isWindows, readJsonFileSync } from '@bemoje/util'
import { Command } from 'commander'
import fs from 'fs'
import { allHelp } from '../util/allHelp'
import { createCommand } from '../util/createCommand'
import { getUserInputFromEditorSync } from '../util/getUserInputFromEditorSync'
import { parseString } from '../util/parse/parseString'
import { validateString } from '../util/validate/validateString'
import { IConfigSetting } from './IConfigSetting'
import { IConfigSettings } from './IConfigSettings'
const { green } = colors

/**
 * A utility class for managing user configuration settings when using the 'commander' package to create CLI's.
 */
export class Config {
  /**
   * An AppData instance that manages both an appdata file, a user config file and a log file.
   */
  readonly data: AppData<Record<string, any>, Record<string, any>>

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
        default: isVsCodeInstalled() ? 'code -w' : isWindows() ? 'notepad' : isOSX() ? 'open vi' : 'xdg-open',
        parse: parseString,
        validate: validateString,
      },
      ...definitions,
    }

    this.data = new AppData<Record<string, any>, Record<string, any>>(appAuthor, appName, 'appdata')

    this.definitions = definitions as IConfigSettings

    this.userconfig.assign(readJsonFileSync(this.userconfig.filepath))
    this.appdata.assign(readJsonFileSync(this.appdata.filepath))

    for (const [name, options] of Object.entries(definitions)) {
      this.userconfig.getOrElse(name, () => options.default)
    }

    this.userconfig.on('set', (time, k: string, v: Record<string, any>) => {
      if (this.definitions[k]) {
        const validate = this.definitions[k].validate
        if (validate) validate(k, v)
      }
    })
  }

  get userconfig(): Record<string, any> {
    return this.data.user
  }

  get appdata(): Record<string, any> {
    return this.data.app
  }

  /**
   * Edits the user configuration in the editor.
   */
  editConfigInEditor(): void {
    const newJson = getUserInputFromEditorSync({
      appdataDirectory: this.data.directory,
      editor: this.userconfig.get('editor'),
      currentContent: JSON.stringify(this.userconfig.data, null, 2),
      extension: '.json',
    })
    this.userconfig.assign(JSON.parse(newJson) as Record<string, any>)
    console.log('Configuration updated.')
  }

  /**
   * Initializes the configuration settings.
   * @param program - The Commander program instance.
   */
  initialize(program: Command): void {
    program
      .command('appdata')
      .aliases(['D'])
      .description('Get the directory containing your app data.')
      .action((options: { wipe?: boolean } = {}) => {
        console.log('APPDATA: ' + this.data.directory)
        console.log(options)
        if (options.wipe) {
          fs.rmSync(this.data.directory, { recursive: true, force: true })
          console.log('All app data deleted.')
        }
      })

    program
      .command('config')
      .aliases(['C'])
      .description(['User configuration settings.'].join('\r'))
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
        console.log({ action, setting, value })
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

    createCommand(program, {
      command: 'all-help',
      aliases: ['H'],
      summary: 'Print help for every command.',
      usage: [{ command: 'rman all-help' }],
      action: () => {
        allHelp(program)
      },
    })

    const longestCommand = Math.max(...program.commands.map((cmd) => cmd.alias().length))
    program.configureHelp({
      subcommandTerm: (cmd) => `${cmd.alias() ? cmd.alias().padEnd(longestCommand, ' ') + '|' : ''}${cmd.name()}`,
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
    this.userconfig.set(setting, definition.parse(value || JSON.stringify(this)))
    console.log(`The '${setting}' setting has been configured.`)
  }

  /**
   * Resets a configuration setting.
   * @param setting - The name of the setting. If omitted, all settings are reset.
   */
  reset(setting?: string): void {
    if (!setting) {
      fs.rmSync(this.userconfig.filepath)
      console.log('All app data deleted.')
      process.exit(0)
    }
    const definition = this.definitions[setting]
    if (!definition) {
      return console.log(`The '${setting}' setting not recognized.`)
    }
    if (this.userconfig.get(setting) !== definition.default) {
      this.userconfig.set(setting, definition.default)
      console.log(`The '${setting}' setting has been reset to its default value.`)
    }
  }
}

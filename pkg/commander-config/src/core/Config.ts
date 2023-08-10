import getAppDataPath from 'appdata-path'
import { Command } from 'commander'
import fs from 'fs'
import { mkdirpSync } from 'mkdirp'
import path from 'path'
import { getUserInputFromEditor } from '../util/getUserInputFromEditor'
import { parseString } from '../util/parseString'
import { ConfigSetting } from './ConfigSetting'
import { IConfigSetting } from './IConfigSetting'
import { IConfigSettings } from './IConfigSettings'

export class Config {
  appdataDirectory: string
  definitions: IConfigSettings
  settings: Record<string, any>

  constructor(appAuthor: string, appName: string, definitions: Record<string, IConfigSetting>) {
    definitions = {
      editor: {
        description: 'The editor to use for example when editing config settings as JSON.',
        default: 'notepad',
        required: true,
        parse: parseString,
      },
      ...definitions,
    }
    this.appdataDirectory = path.join(getAppDataPath(), appAuthor, appName)
    this.definitions = Object.entries(definitions).reduce((accum: IConfigSettings, [name, options]) => {
      accum[name] = new ConfigSetting(name, options)
      return accum
    }, {} as IConfigSettings)
    this.ensureConfigFileExists()
    this.settings = JSON.parse(fs.readFileSync(this.configFilepath, 'utf8')) as Record<keyof typeof definitions, any>
  }

  get configFilepath() {
    return path.join(this.appdataDirectory, 'config.json')
  }

  initialize(program: Command) {
    program
      .command('config')
      .description('View / edit the settings as JSON in the defined editor.')
      .action(async () => {
        const json = JSON.stringify(this.settings, null, 1)
        const newJson = await getUserInputFromEditor({
          appdataDirectory: this.appdataDirectory,
          editor: this.settings.editor,
          currentContent: json,
        })
        this.settings = JSON.parse(newJson)
        this.saveConfigFile()
      })

    program
      .command('config-list')
      .description('List the current config settings.')
      .argument('[setting]', 'The name of the setting. Omit to list all settings.')
      .action(() => this.print())

    program
      .command('config-reset')
      .description('Reset one or all settings to their default values.')
      .argument('[setting]', 'The name of the setting. Omit to reset all settings.')
      .action((setting?: string) => this.reset(setting))

    program
      .command('config-set')
      .description('Configure a setting of the config.')
      .argument('<setting>', 'The name of the setting.')
      .argument('<value>', 'The value to assign.')
      .action((setting: string, value: string) => this.set(setting, value))
  }

  ensureConfigFileExists() {
    if (!fs.existsSync(this.configFilepath)) {
      this.settings = Object.fromEntries(
        Object.entries(this.definitions).map(([name, definition]) => {
          return [name, definition.default]
        }),
      )
      this.saveConfigFile()
    }
  }

  saveConfigFile() {
    mkdirpSync(this.appdataDirectory)
    fs.writeFileSync(this.configFilepath, JSON.stringify(this.settings, null, 1))
  }

  set(setting: string, value: string) {
    const definition = this.definitions[setting]
    if (!definition) {
      console.log(`The '${setting}' setting not recognized.`)
      return
    }
    this.settings[setting] = definition.parse(value || JSON.stringify(this))
    this.saveConfigFile()
    console.log(`The '${setting}' setting has been configured.`)
    this.print(setting)
  }

  print(setting?: string) {
    if (setting) {
      const definition = this.definitions[setting]
      if (definition) {
        console.log({
          name: definition.name,
          description: definition.description,
          required: definition.required,
          default: definition.default,
          value: this.settings[definition.name],
        })
        return
      }
    }
    Object.values(this.definitions).forEach((o) => {
      console.log({
        name: o.name,
        description: o.description,
        required: o.required,
        default: o.default,
        value: this.settings[o.name],
      })
    })
  }

  protected reset(setting?: string) {
    if (setting !== undefined) {
      const definition = this.definitions[setting]
      if (!definition) {
        console.log(`The '${setting}' setting not recognized.`)
        return
      }
      this.settings[setting] = definition.default
      console.log(`The '${setting}' setting has been reset to its default value.`)
    } else {
      Object.values(this.definitions).forEach((o) => {
        this.settings[o.name] = o.default
        console.log(`The '${o.name}' setting has been reset to its default value.`)
      })
    }
    this.print(setting)
    this.saveConfigFile()
  }

  assertNoMissingRequired(): void {
    const missing = Object.values(this.definitions).filter(
      (o) => o.required && (this.settings[o.name] === '' || this.settings[o.name] === undefined),
    )
    if (missing.length) {
      console.log(
        `The following required settings are missing: ${missing
          .map((o) => o.name)
          .join(
            ', ',
          )}.\nUse the "config-set" command to configure them.\nUse the "config-list" command to list all settings.`,
      )
      process.exit()
    }
  }
}

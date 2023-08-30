import { AppData, readJsonFileSync } from '@bemoje/fs'
import { cyan, green } from 'cli-color'
import { Command } from 'commander'
import fs from 'fs'
import { getUserInputFromEditorSync } from '../util/getUserInputFromEditorSync'
import { parseString } from '../util/parseString'
import { validateString } from '../util/validateString'
import { IConfigSetting } from './IConfigSetting'
import { IConfigSettings } from './IConfigSettings'

export class Config {
  readonly appdata: AppData<Record<string, any>, Record<string, any>>
  readonly definitions: IConfigSettings

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

    this.appdata = new AppData(appAuthor, appName, 'appdata')

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

  editConfigInEditor() {
    const newJson = getUserInputFromEditorSync({
      appdataDirectory: this.appdata.directory,
      editor: this.appdata.user.data.editor,
      currentContent: JSON.stringify(this.appdata.user.data, null, 2),
      extension: '.json',
    })
    this.appdata.user.assign(JSON.parse(newJson) as Record<string, any>)
    console.log('Configuration updated.')
  }

  initialize(program: Command) {
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
        ].join('\n'),
      )
      .argument('[value]', 'The value to assign.')
      .action((action?: string, setting?: string, value?: string) => {
        if (!action || action === 'edit') return this.editConfigInEditor()
        if (action === 'reset') return this.reset(setting)
        if (action === 'set') {
          if (!setting || !value) {
            console.error('Both setting and value must be provided.')
            process.exit()
          }
          return this.set(setting, value)
        }
        console.error(action + ' is not a valid action.')
        process.exit()
      })
  }

  set(setting: string, value: string): void {
    const definition = this.definitions[setting]
    if (!definition) {
      return console.log(`The '${setting}' setting not recognized.`)
    }
    this.appdata.user.set(setting, definition.parse(value || JSON.stringify(this)))
    console.log(`The '${setting}' setting has been configured.`)
  }

  reset(setting?: string): void {
    if (!setting) {
      fs.rmSync(this.appdata.user.filepath)
      console.log('All app data deleted.')
      process.exit()
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

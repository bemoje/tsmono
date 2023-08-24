import { IConfigSetting } from './IConfigSetting'

export class ConfigSetting implements IConfigSetting {
  name: string
  description: string
  default: any
  parse: (string: string) => any
  validate?: (name: string, value: any) => void

  constructor(name: string, options: IConfigSetting) {
    this.name = name
    this.description = options.description
    this.default = options.default
    this.parse = options.parse
    this.validate = options.validate
  }
}

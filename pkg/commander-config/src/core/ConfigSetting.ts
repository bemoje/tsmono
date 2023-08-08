import { IConfigSetting } from './IConfigSetting'

export class ConfigSetting implements IConfigSetting {
  name: string
  description: string
  default: any
  required: boolean
  parse: (string: string) => any

  constructor(name: string, options: IConfigSetting) {
    this.name = name
    this.description = options.description ?? ''
    this.default = options.default ?? ''
    this.required = options.required ?? false
    this.parse = options.parse
  }
}

export interface IConfigSetting {
  description: string
  default: string
  required: boolean
  parse: (string: string) => string
}

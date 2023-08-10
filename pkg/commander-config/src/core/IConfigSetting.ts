export interface IConfigSetting {
  description: string
  default: any
  required: boolean
  parse: (string: string) => any
}

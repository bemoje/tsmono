/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IConfigSetting {
  description: string
  default: any
  parse: (string: string) => any
  validate?: (name: string, value: any) => void
}

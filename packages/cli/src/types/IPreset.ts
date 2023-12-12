import { OptionValues } from 'commander'

export interface IPreset {
  description: string
  presets: string[]
  args: OptionValues[keyof OptionValues][]
  options: OptionValues
}

export interface IPresetPartial {
  description: string
  presets?: string[]
  args?: OptionValues[keyof OptionValues][]
  options?: OptionValues
}

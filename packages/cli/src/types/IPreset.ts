import { OptionValues } from 'commander'

export interface IPreset<O extends OptionValues = OptionValues> {
  description: string
  presets: string[]
  args: OptionValues[keyof OptionValues][]
  options: O
}

export interface IPresetPartial<O extends OptionValues = OptionValues> {
  description: string
  presets?: string[]
  args?: OptionValues[keyof OptionValues][]
  options?: O
}

import { OptionValues } from 'commander'

export type TPresetDefaultValue = boolean | string | number
export type TPresetDefaultOptions<T extends TPresetDefaultValue = TPresetDefaultValue> = Record<string, T>

export interface IPreset<O extends OptionValues = OptionValues> {
  name: string
  summary: string
  args: string[]
  options: O
}

export interface IPresets<O extends OptionValues = OptionValues> {
  defaults: IPreset<O>
  [name: string]: IPreset<O>
}

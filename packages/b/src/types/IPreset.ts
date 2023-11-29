import { Any, JsonValue } from '@bemoje/util'
import { OptionValues } from 'commander'

export interface IPreset<O extends OptionValues = OptionValues> {
  description: string
  presets: string[]
  args: Any[]
  options: O
}

export interface IPresetPartial<O extends OptionValues = OptionValues> {
  description: string
  presets?: string[]
  args?: Any[]
  options?: O
}

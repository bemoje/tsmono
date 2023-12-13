import type { Any } from '../util/types/Any'
import type { OptionValues } from '@commander-js/extra-typings'

export interface IPreset {
  description: string
  presets: string[]
  args: Any[]
  options: OptionValues
}

export interface IPresetPartial {
  description: string
  presets?: string[]
  args?: Any[]
  options?: OptionValues
}

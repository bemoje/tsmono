import { IPreset } from './IPreset'
import { OptionValues } from 'commander'

export interface IPresets<O extends OptionValues = OptionValues> {
  defaults: IPreset<O>
  [name: string]: IPreset<O>
}

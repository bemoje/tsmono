import { IPreset } from './IPreset'
import { JsonRawPrimitive } from '@bemoje/util'
import { TConfigValidator } from './TConfigValidator'

export interface IPresetsDefinePropertyOptions<Val = JsonRawPrimitive> extends IPreset {
  validate?: TConfigValidator<Val>
}

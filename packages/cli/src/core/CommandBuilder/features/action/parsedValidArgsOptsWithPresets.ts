import { CommandBuilder } from '../../CommandBuilder'
import { debugLogArgsOpts } from './debugLogArgsOpts'
import { getPresetArgsAndOpts } from './getPresetArgsAndOpts'
import { parsedValidArgsWithPresets } from './parsedValidArgsWithPresets'
import { parsedValidOptsWithPresets } from './parsedValidOptsWithPresets'

export function parsedValidArgsOptsWithPresets(cmd: CommandBuilder) {
  const [presetArgs, presetOpts, presetOrder] = getPresetArgsAndOpts(cmd)
  const args = parsedValidArgsWithPresets(cmd, presetArgs)
  const opts = parsedValidOptsWithPresets(cmd, presetOpts)
  debugLogArgsOpts(cmd, args, opts, presetArgs, presetOpts, presetOrder)
  return [args, opts]
}

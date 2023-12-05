import { Any } from '@bemoje/util'
import { CommandBuilder } from '../../CommandBuilder'
import { getARGV } from '../../../util/getARGV'
import { OptionValues } from 'commander'

export function debugLogArgsOpts(
  cb: CommandBuilder,
  args: Any[],
  opts: OptionValues,
  presetArgs: string[][],
  presetOpts: OptionValues[],
  presetOrder: string[]
) {
  if (opts['debug']) {
    cb.outputDebugInfo('action', () => {
      return {
        ...(cb.features.isPresetsEnabled ? { presetOrder, presetArgs, presetOpts } : {}),
        args,
        opts,
        command: [cb.root.name, ...getARGV()].join(' '),
      }
    })
  }
}

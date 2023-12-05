import { CommandBuilder } from '../../CommandBuilder'
import { IPresets } from '../../../../types/IPresets'
import { OptionValues } from 'commander'

export function getPresetArgsAndOpts(
  cmd: CommandBuilder
): [presetArgs: string[][], presetOpts: OptionValues[], presetOrder: string[]] {
  if (!cmd.features.isPresetsEnabled) return [[], [], []]
  const presets = cmd.db.presets.getAll() as IPresets
  const opts = cmd.$.optsWithGlobals()
  const selectedPresets = Object.keys(presets).filter((name) => opts[name] === true)

  const order = new Set<string>()
  for (const name of ['defaults', ...selectedPresets]) {
    for (const n of presets[name].presets.concat(name)) {
      if (order.has(n)) order.delete(n)
      order.add(n)
    }
  }
  const presetOrder = [...order]
  const presetArgs: string[][] = presetOrder.map((name) => presets[name].args)
  const presetOpts: OptionValues[] = presetOrder.map((name) => presets[name].options)
  return [presetArgs, presetOpts, presetOrder]
}

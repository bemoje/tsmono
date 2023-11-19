import { Command, OptionValues } from 'commander'
import { createPresetAction } from './createPresetAction'
import { IPreset } from './IPreset'
import { PRESETS } from '../../bFindInCommand'

export function createPreset<O extends OptionValues = OptionValues>(parent: Command, preset: IPreset<O>) {
  PRESETS[preset.name] = preset
  const cmd = new Command(preset.name)
  if (preset.summary.includes('. ')) {
    cmd.summary(preset.summary.substring(0, preset.summary.indexOf('. ')))
    cmd.description(preset.summary)
  } else {
    cmd.summary(preset.summary)
  }
  cmd.usage(parent.usage())
  cmd.showHelpAfterError()
  cmd.allowUnknownOption(true)
  cmd.allowExcessArguments(true)
  cmd.argument('<args...>', 'arguments')
  cmd.action(createPresetAction(parent, cmd, preset))

  parent.addCommand(cmd)
  return cmd
}

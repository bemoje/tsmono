import { Command, OptionValues } from 'commander'
import { createPresetAction } from './createPresetAction'
import { IPreset } from '../../../../../core/CommandBuilder/IPreset'
import { PRESETS } from '../../bFindInCommand'

export function createPreset<O extends OptionValues = OptionValues>(parent: Command, preset: IPreset<O>) {
  PRESETS[preset.name] = preset
  const cmd = new Command(preset.name)
  if (preset.description.includes('. ')) {
    cmd.summary(preset.description.substring(0, preset.description.indexOf('. ')))
    cmd.description(preset.description)
  } else {
    cmd.summary(preset.description)
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

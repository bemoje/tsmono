import { Command, OptionValues } from 'commander'
import { createPreset } from './createPreset'
import { createPresetListCommand } from './createPresetListCommand'

export function createPresets<O extends OptionValues = OptionValues>(
  parent: Command,
  presets: Record<string, IPartialPreset<O>>
) {
  const numArgs = parent.registeredArguments.length
  for (const [name, preset] of Object.entries(presets)) {
    if (!preset.args) {
      preset.args = new Array(numArgs).fill('')
    } else if (preset.args.length !== numArgs) {
      throw new Error(`preset ${name} has ${preset.args.length} args, but parent has ${numArgs} args`)
    }
    createPreset<O>(parent, {
      name,
      description: preset.description,
      args: preset.args,
      options: preset.options || ({} as O),
    })
  }
  return parent
}

interface IPartialPreset<O extends OptionValues = OptionValues> {
  name?: string
  description: string
  args?: string[]
  options?: O
}

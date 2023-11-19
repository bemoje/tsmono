import { Command } from 'commander'
import { PRESETS } from '../../bFindInCommand'

export function createPresetListCommand(parent: Command) {
  const sub = new Command('listPresets')
  parent.addCommand(sub)
  sub.summary('List all presets')
  sub.action(async () => {
    for (const preOpts of Object.values(PRESETS)) {
      console.dir(preOpts, { depth: null })
    }
  })
}

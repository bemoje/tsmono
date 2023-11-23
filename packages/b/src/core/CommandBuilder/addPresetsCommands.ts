import { CommandBuilder } from './CommandBuilder'
import { IPresets } from './IPreset'

export function addPresetsCommands(cb: CommandBuilder) {
  if (cb.isPreset || cb.isPresetRelatedCommand || cb.isConfigRelatedCommand) return

  cb.command('presets', (presets) => {
    presets.isPresetRelatedCommand = true
    presets.description(
      [
        'Edit presets in your text editor',
        '',
        'A preset consists of pre-set arguments and/or options for a command.',
        'Additionally, a preset can have other presets as dependencies.',
        'When running the command, multiple presets can be stacked.',
        'Required arguments cannot be pre-set.',
      ].join('\n')
    )
    presets.action(async () => {
      await cb.db.presets.edit()
      console.info(await cb.db.presets.getAll())
    })

    presets.command('list', (list) => {
      list.isPresetRelatedCommand = true
      list.description('List all presets.')
      list.action(async () => {
        console.log(await cb.db.presets.getAll())
      })
    })
  })

  const argv = process.argv.slice(2)
  cb.db.presets.initializeSync()
  for (const [name, pre] of Object.entries(cb.db.presets.getSync() as IPresets)) {
    if (name === 'defaults') continue
    cb.command(name, (cmd) => {
      cmd.isPreset = true
      cmd.$.allowExcessArguments(true)
      cmd.$.allowUnknownOption(true)
      cmd.description('[Preset]: ' + pre.description)
      cmd.action(async () => {
        cb.selectedPresets.push(name)
        argv.shift()
        await cb.parseAsync(argv, { from: 'user' })
      })
    })
  }
}

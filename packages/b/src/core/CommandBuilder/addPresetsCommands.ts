import { CommandBuilder } from './CommandBuilder'
import { IPresets } from '../../cli/bFindIn/lib/core/preset/IPreset'

export function addPresetsCommands(cb: CommandBuilder) {
  if (cb.isPreset || cb.isPresetRelatedCommand) return

  cb.command('presets', (presets) => {
    presets.isPresetRelatedCommand = true

    presets.description('Manage presets.')

    presets.command('edit', (edit) => {
      edit.isPresetRelatedCommand = true
      edit.description('Edit a preset.')
      edit.action(async () => {
        await cb.db.presets.edit()
        console.info(await cb.db.presets.getAll())
      })
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
      cmd.description('[Preset]: ' + pre.summary)
      cmd.action(async () => {
        cb.selectedPresets.push(name)
        argv.shift()
        await cb.parseAsync(argv, { from: 'user' })
      })
    })
  }
}

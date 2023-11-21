import { Any, readJsonFileSafeSync } from '@bemoje/util'
import { CommandBuilder } from './CommandBuilder'
import { IPresets } from '../../cli/bFindIn/lib/core/preset/IPreset'

export function addPresetsCommands(cb: CommandBuilder) {
  cb.command('presets', (presets) => {
    presets.description('Manage presets.')

    presets.command('edit', (edit) => {
      edit.description('Edit a preset.')
      edit.action(async () => {
        await cb.db.presets.edit()
        console.info(await cb.db.presets.get())
      })
    })

    presets.command('list', (list) => {
      list.description('List all presets.')
      list.action(async () => {
        console.log(await cb.db.presets.get())
      })
    })
  })

  const argv = process.argv.slice(2)
  for (const [name, pre] of Object.entries(getPresetsFromConfig(cb))) {
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

function getPresetsFromConfig(cb: CommandBuilder): IPresets {
  const definitions = cb.db.presets.definitions
  const data: Any = readJsonFileSafeSync<IPresets>(cb.filepath)
  const presets = data ? data.presets || [] : []
  return Object.assign({}, definitions, presets)
}

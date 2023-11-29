import { CommandBuilder } from './CommandBuilder'
import { getRootCommand } from '../util/getRootCommand'

export function addPresetsCommands(cmd: CommandBuilder) {
  if (!cmd.isPresetsEnabled || !cmd.actionHandler) return

  const argv = process.argv.slice(2) // TODO: this wont work for subcommand presets

  for (const [name, pre] of Object.entries(cmd.db.presets.getAll())) {
    if (name === 'defaults') continue
    cmd.command(name, (sub) => {
      sub.description('[Preset]: ' + pre.description)
      sub.isPreset = true
      sub.allowExcessArguments()
      sub.allowUnknownOption()
      sub.action(async () => {
        console.log(sub.$.args)
        cmd.selectedPresets.push(name)
        argv.shift()
        await cmd.parseAsync(argv, { from: 'user' })
      })
    })
  }

  cmd.command('presets', (presets) => {
    presets.description(
      'Edit presets in your text editor',
      '',
      'A preset consists of pre-set arguments and/or options for a command.',
      'Additionally, a preset can have other presets as dependencies.',
      'When running the command, multiple presets can be stacked.',
      'Required arguments cannot be pre-set.'
    )

    presets.command('edit', (edit) => {
      edit.description('Edit as JSON in a text editor.')
      edit.option('--editor [cmd]', (e) => {
        e.description('The command to launch your preferred text editor.')
        e.default(getRootCommand(cmd).db.config.get('editor'))
      })
      edit.action(async (opts) => {
        cmd.db.presets.edit(opts.editor)
        console.info(cmd.db.presets.getAll())
      })
    })

    presets.command('list', (list) => {
      list.description('List all presets.')
      list.disableGlobalOptions(['quiet', 'silent'])
      list.action(async () => {
        console.dir(cmd.db.presets.getAll(), { depth: null })
      })
    })
  })
}

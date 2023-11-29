import { CommandBuilder } from './CommandBuilder'
import { getRootCommand } from '../util/getRootCommand'

export function addConfigCommands(cmd: CommandBuilder) {
  if (!cmd.isConfigEnabled) return

  cmd.command('config', (config) => {
    config.description('Manage config.')

    config.command('edit', (edit) => {
      edit.description('Edit as JSON in a text editor.')
      edit.option('--editor [cmd]', (e) => {
        e.description('The command to launch your preferred text editor.')
        e.default(getRootCommand(cmd).db.config.get('editor'))
      })
      edit.action(async (opts: { editor: string }) => {
        cmd.db.config.edit(opts.editor)
        console.info(cmd.db.config.getAll())
      })
    })

    config.command('list', (list) => {
      list.description('Print entire config with values, descriptions and defaults.')
      list.disableGlobalOptions(['quiet'])
      list.action(async () => {
        console.dir(
          cmd.db.config.keys.map((key) => {
            return {
              key,
              description: cmd.db.config.descriptions[key],
              value: cmd.db.config.get(key),
              defaultValue: cmd.db.config.defaultValues,
            }
          })
        )
      })
    })

    config.command('get', (get) => {
      get.description('Print value(s) from the config.')
      get.disableGlobalOptions(['quiet'])
      get.argument('[key]', (a) => {
        a.description('The key to print the value of. Omit to print all values.')
        a.choices(cmd.db.config.keys)
      })
      get.action(async (key?: string) => {
        if (key) console.log(cmd.db.config.get(key))
        else console.log(cmd.db.config.getAll())
      })
    })

    config.command('set', (set) => {
      set.description('Set a value in the config.')
      set.argument('<key>', (a) => {
        a.description('The key to set the value of.')
        a.choices(cmd.db.config.keys)
      })
      set.argument('<value>', (a) => a.description('The new value.'))
      set.action(async (key: string, value: string) => {
        const from = cmd.db.config.get(key)
        const to = cmd.db.config.parsers[key](value)
        cmd.db.config.set(key, to)
        console.info({ changed: key, from, to })
      })
    })

    config.command('reset', (reset) => {
      reset.description('Reset to defaults.')
      reset.argument('[key]', (a) => {
        a.description('The key for which to reset the value. Omit to reset entire config.')
        a.choices(cmd.db.config.keys)
      })
      reset.action(async (key?: string) => {
        if (key) cmd.db.config.reset(key)
        else cmd.db.config.resetAll()
        console.info(cmd.db.config.getAll())
      })
    })
  })
}

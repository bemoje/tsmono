import { CommandBuilder } from './CommandBuilder'
import { OptionValues } from 'commander'

export function addConfigCommands(cb: CommandBuilder) {
  cb.command('config', (config) => {
    config.description('Edit the configuration file in your text editor.')
    config.globalOption('-s, --silent', (o) => o.description('Do not print config after making changes.'))
    config.action(async (args, opts) => {
      await cb.userconfig.edit()
      await printConfig(opts)
    })
    config.command('docs', (docs) => {
      docs.description('Print config documentation')
      docs.action(async () => {
        const result: Record<string, string> = {}
        for (const [key, definition] of Object.entries(cb.userconfig.definitions)) {
          result[key] = definition.description + ' (default: ' + definition.defaultValue + ')'
        }
        console.log(result)
      })
    })
    config.command('get', (get) => {
      get.description('Print value(s) from the config.')
      get.argument('[key]', (a) => a.description('The key to print the value of. Omit to print all values.'))
      get.action(async (args) => {
        console.log(await cb.userconfig.get(args[0]))
      })
    })
    config.command('set', (set) => {
      set.description('Set a value in the config.')
      set.argument('<key>', (a) => a.description('The key to set the value of.'))
      set.argument('<value>', (a) => a.description('The new value.'))
      set.action(async (args, opts) => {
        const key = args[0]
        const value = cb.userconfig.definitions[key].parse(args[1], null)
        await cb.userconfig.set(key, value)
        await printConfig(opts)
      })
    })
    config.command('reset', (reset) => {
      reset.description('Reset config value(s) to default(s)')
      reset.argument('[key]', (a) => a.description('The key to reset the value of. Omit to reset all values.'))
      reset.action(async (args, opts) => {
        await cb.userconfig.reset(args[0])
        await printConfig(opts)
      })
    })
  })

  async function printConfig(opts: OptionValues) {
    if (!opts['silent']) console.log(await cb.userconfig.get())
  }
}

export function addPresetsCommands(cb: CommandBuilder) {
  cb.command('presets', (presets) => {
    presets.description('Manage presets.')
    presets.globalOption('-s, --silent', (o) => o.description('Do not print preset details after making changes.'))
    presets.command('list', (list) => {
      list.description('List all presets.')
      list.action(async () => {
        console.log('Listing all presets')
      })
    })
    presets.command('create', (add) => {
      add.description('Create a preset.')
      add.argument('<name>', (a) => a.description('The name of the preset.'))
      add.action(async (args) => {
        const [name] = args
        console.log('Creating preset ' + name)
      })
    })
    presets.command('edit', (edit) => {
      edit.description('Edit a preset.')
      edit.argument('<name>', (a) => a.description('The name of the preset.'))
      edit.action(async (args) => {
        const [name] = args
        console.log('Deleting preset ' + name)
      })
    })
    presets.command('delete', (del) => {
      del.description('Delete a preset.')
      del.argument('<name>', (a) => a.description('The name of the preset.'))
      del.action(async (args) => {
        const [name] = args
        console.log('Deleting preset ' + name)
      })
    })
  })

  async function printConfig(opts: OptionValues) {
    if (!opts['silent']) console.log(await cb.userconfig.get())
  }
}

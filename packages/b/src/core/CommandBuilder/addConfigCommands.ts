import { CommandBuilder } from './CommandBuilder'

export function addConfigCommands(cb: CommandBuilder) {
  cb.command('config', (config) => {
    config.description('Edit the configuration file in your text editor.')
    config.action(async () => {
      await cb.db.config.edit()
      await printConfig()
    })
    config.command('docs', (docs) => {
      docs.description('Print config documentation')
      docs.action(async () => {
        const result: Record<string, string> = {}
        for (const [key, definition] of Object.entries(cb.db.config.definitions)) {
          result[key] = definition.description + ' (default: ' + definition.defaultValue + ')'
        }
        console.log(result)
      })
    })
    config.command('get', (get) => {
      get.description('Print value(s) from the config.')
      get.argument('[key]', (a) => a.description('The key to print the value of. Omit to print all values.'))
      get.action(async (args) => {
        console.log(await cb.db.config.get(args[0]))
      })
    })
    config.command('set', (set) => {
      set.description('Set a value in the config.')
      set.argument('<key>', (a) => a.description('The key to set the value of.'))
      set.argument('<value>', (a) => a.description('The new value.'))
      set.action(async (args) => {
        const key = args[0]
        const value = cb.db.config.definitions[key].parse(args[1], null)
        await cb.db.config.set(key, value)
        await printConfig()
      })
    })
    config.command('reset', (reset) => {
      reset.description('Reset config value(s) to default(s)')
      reset.argument('[key]', (a) => a.description('The key to reset the value of. Omit to reset all values.'))
      reset.action(async (args) => {
        await cb.db.config.reset(args[0])
        await printConfig()
      })
    })
  })

  async function printConfig() {
    console.info(await cb.db.config.get())
  }
}

import { CommandBuilder } from '../CommandBuilder'
import { defaultOpenInEditorCommand } from '@bemoje/util'
import { getClosestNonNativeParent } from './getClosestNonNativeParent'

export function addConfigCommands(cmd: CommandBuilder) {
  cmd.nativeCommand('config', createConfig)
}

export const createConfig = (() => {
  return function createConfig(config: CommandBuilder) {
    config.description('Manage configuration file.')
    config.alias('c')
    config.nativeCommand('edit', createEdit)
    config.nativeCommand('list', createList)
    config.nativeCommand('get', createGet)
    config.nativeCommand('set', createSet)
    config.nativeCommand('reset', createReset)
  }

  function createEdit(edit: CommandBuilder) {
    edit.description('Edit as JSON in a text editor.')
    edit.option('--editor [cmd]', (e) => {
      e.description('The command to launch your preferred text editor.')
      e.default(defaultOpenInEditorCommand())
    })
    edit.action(editAction)
  }

  async function editAction(opts: { editor: string }, edit: CommandBuilder) {
    const cmd = getClosestNonNativeParent(edit)
    cmd.db.config.edit(opts.editor)
    console.info(cmd.db.config.getAll())
  }

  function createList(list: CommandBuilder) {
    list.description('Print entire config with values, descriptions and defaults.')
    list.action(listAction)
  }

  async function listAction(_: unknown, list: CommandBuilder) {
    const cmd = getClosestNonNativeParent(list)
    console.dir(
      cmd.db.config.keys.map((key: string) => {
        return {
          key,
          description: cmd.db.config.descriptions[key],
          value: cmd.db.config.get(key),
          defaultValue: cmd.db.config.defaultValues,
        }
      })
    )
  }

  function createGet(get: CommandBuilder) {
    get.description('Print value(s) from the config.')
    get.argument('[key]', (a) => {
      a.description('The key to print the value of. Omit to print all values.')
      a.choices(a.cmd.db.config.keys)
    })
    get.action(getAction)
  }

  async function getAction(key: string, get: CommandBuilder) {
    const cmd = getClosestNonNativeParent(get)
    if (key) console.log(cmd.db.config.get(key))
    else console.log(cmd.db.config.getAll())
  }

  function createSet(set: CommandBuilder) {
    set.description('Set a value in the config.')
    set.argument('<key>', (a) => {
      a.description('The key to set the value of.')
      a.choices(a.cmd.db.config.keys)
    })
    set.argument('<value>', (a) => a.description('The new value.'))
    set.action(setAction)
  }

  async function setAction(key: string, value: string, set: CommandBuilder) {
    const cmd = getClosestNonNativeParent(set)
    const from = cmd.db.config.get(key)
    const to = cmd.db.config.parsers[key](value)
    cmd.db.config.set(key, to)
    console.info({ changed: key, from, to })
  }

  function createReset(reset: CommandBuilder) {
    reset.description('Reset to defaults.')
    reset.argument('[key]', (a) => {
      a.description('The key for which to reset the value. Omit to reset entire config.')
      a.choices(a.cmd.db.config.keys)
    })
    reset.action(resetAction)
  }

  async function resetAction(key: string, reset: CommandBuilder) {
    const cmd = reset.parent?.parent as CommandBuilder
    if (key) cmd.db.config.reset(key)
    else cmd.db.config.resetAll()
    console.info(cmd.db.config.getAll())
  }
})()

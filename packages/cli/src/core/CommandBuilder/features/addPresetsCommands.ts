import { CommandBuilder } from '../CommandBuilder'
import { defaultOpenInEditorCommand } from '@bemoje/util'
import { getClosestNonNativeParent } from './getClosestNonNativeParent'

export function addPresetsCommands(cmd: CommandBuilder) {
  cmd.nativeCommand('presets', createPresets)
}

export const createPresets = (() => {
  return function createPresets(presets: CommandBuilder) {
    const cmd = getClosestNonNativeParent(presets)
    for (const [name, pre] of Object.entries(cmd.db.presets.getAll())) {
      if (name === 'defaults') continue
      cmd.option(`--${name}`, (opt) => {
        opt.description('[Preset]: ' + pre.description)
        if (pre.presets.length) {
          opt.implies(
            pre.presets.reduce((acc, key) => {
              acc[key] = true
              return acc
            }, {} as Record<string, boolean>)
          )
        }
      })
    }

    presets.alias('p')

    presets.description(
      'Edit presets in your text editor',
      '',
      'A preset consists of pre-set arguments and/or options for a command.',
      'Additionally, a preset can have other presets as dependencies.',
      'When running the command, multiple presets can be stacked.',
      'Required arguments cannot be pre-set.'
    )
    presets.nativeCommand('edit', createEdit)
    presets.nativeCommand('list', createList)
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
    cmd.db.presets.edit(opts.editor)
    console.info(cmd.db.presets.getAll())
  }

  function createList(list: CommandBuilder) {
    list.description('List all presets.')
    list.action(listAction)
  }

  async function listAction(_: unknown, list: CommandBuilder) {
    const cmd = getClosestNonNativeParent(list)
    console.dir(cmd.db.presets.getAll(), { depth: null })
  }
})()

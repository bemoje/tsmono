import { addConfigCommands } from './addConfigCommands'
import { addPresetsCommands } from './addPresetsCommands'
import { colors } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder'
import { formatTableForTerminal } from './formatTableForTerminal'
import { getClosestNonNativeParent } from './getClosestNonNativeParent'
import { getJsonFilepath } from '../../util/getJsonFilepath'
import { prefixStringsRecursive } from '../../util/prefixStringsRecursive'

export function addUtilCommands(cmd: CommandBuilder) {
  cmd.nativeCommand('util', createUtil)
}

const createUtil = (() => {
  return function createUtil(util: CommandBuilder) {
    util.$.alias('u')
    util.description('Utility commands.')
    const cmd = getClosestNonNativeParent(util)
    if (cmd.features.isConfigEnabled) {
      addConfigCommands(util)
    }
    if (cmd.features.isPresetsEnabled && cmd.meta.actionHandler) {
      addPresetsCommands(util)
    }

    if (hasGrandChildren(cmd) || usesJsonFile(cmd)) {
      util.nativeCommand('tree', createTree)
    }

    if (usesJsonFile(cmd)) {
      util.nativeCommand('filepath', createFilepath)
    }
  }

  function hasGrandChildren(c: CommandBuilder) {
    return c.meta.subcommands.some((c) => !!c.meta.subcommands.length)
  }

  function usesJsonFile(c: CommandBuilder) {
    return c.features.isConfigEnabled || c.features.isPresetsEnabled
  }

  function createFilepath(fp: CommandBuilder) {
    fp.description('Print filepath to JSON file containing user data, eg. config and presets.')
    fp.action(filepathAction)
  }
  async function filepathAction(_: unknown, fp: CommandBuilder) {
    const cmd = getClosestNonNativeParent(fp)
    console.log(getJsonFilepath(cmd))
  }

  function createTree(tree: CommandBuilder) {
    tree.description('List nested subcommands.')
    tree.action(treeAction)
    tree.nativeCommand('all', createTreeAll)
  }
  async function treeAction(_: unknown, tree: CommandBuilder) {
    const cmd = getClosestNonNativeParent(tree)
    const table = prefixStringsRecursive(cmd, (prefix: string) => {
      return !/ (config|presets|util)( .+)?$/gi.test(prefix)
    })
    console.log(formatCommandTable(table))
  }

  function createTreeAll(all: CommandBuilder) {
    all.description('List all subcommands including utility commands.')
    all.action(treeAllAction)
  }
  async function treeAllAction(_: unknown, all: CommandBuilder) {
    const cmd = getClosestNonNativeParent(all)
    const table = prefixStringsRecursive(cmd)
    console.log(formatCommandTable(table))
  }

  function formatCommandTable(table: string[][]) {
    const ansi = table.map((row) => {
      const arr = row[0].split(' ')
      const last = arr.pop() as string
      let col = colors.magenta
      if (row[1].startsWith('[Preset]')) {
        col = colors.green
      } else if (/ (util|config|presets) /.test(row[0])) {
        col = colors.gray
      } else if (/ (util|config|presets)/.test(row[0])) {
        col = colors.dim
      }
      row[0] = arr.map(colors.dim).concat(col(last)).join(' ')
      return row
    })
    return formatTableForTerminal(ansi, ['Command', 'Summary'])
  }
})()

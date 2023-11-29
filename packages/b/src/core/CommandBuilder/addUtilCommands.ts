import Table from 'cli-table3'
import { colors } from '@bemoje/util'
import { CommandBuilder } from './CommandBuilder'
import { prefixStringsRecursive } from '../util/prefixStringsRecursive'

colors.disable()

export function addUtilCommands(cmd: CommandBuilder) {
  if (!cmd.isRoot) return

  cmd.command('util', (util) => {
    util.description('Utility commands.')

    util.command('tree', (tree) => {
      tree.description('List nested subcommands.')
      tree.disableGlobalOptions(['quiet'])
      tree.action(async () => {
        console.log(
          tableToFormattedString(
            prefixStringsRecursive(cmd, (prefix: string) => {
              return !/ (config|presets|util)( .+)?$/gi.test(prefix)
            }).map((row) => {
              const arr = row[0].split(' ')
              const last = colors.green(arr.pop() || '')
              const pref = colors.dim(arr.join(' '))
              row[0] = [pref, last].join(' ').trim()
              return row
            }),
            ['Command', 'Summary']
          )
        )
      })
      tree.command('all', (all) => {
        all.description('List all subcommands including from utils.')
        all.disableGlobalOptions(['quiet'])
        all.action(async () => {
          console.log(
            tableToFormattedString(
              prefixStringsRecursive(cmd).map((row) => {
                const arr = row[0].split(' ')
                const last = colors.green(arr.pop() as string)
                row[0] = arr.map(colors.dim).concat(last).join(' ')
                return row
              }),
              ['Command', 'Summary']
            )
          )
        })
      })
    })

    util.command('filepath', (tree) => {
      tree.description('Print filepath to JSON file containing user data, eg. config and presets.')
      tree.disableGlobalOptions(['quiet'])
      tree.action(async () => {
        console.log(cmd.filepath)
      })
    })
  })
}

export function tableToFormattedString(rows: string[][], headers?: string[]) {
  if (!rows.length || !rows[0].length) return ''
  const table = new Table(headers && headers.length ? { head: headers } : undefined)
  for (const row of rows) table.push(row)
  return table.toString()

  // const pads = table[0].map((_, c) => {
  //   return Math.max(...table.map((row) => row[c].length))
  // })

  // return table
  //   .map((row) => {
  //     return row
  //       .map((cell, c) => {
  //         return cell.padEnd(pads[c], ' ')
  //       })
  //       .join(' | ')
  //   })
  //   .join('\n')
}

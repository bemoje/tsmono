import Table from 'cli-table'
import { colors } from '@bemoje/util'

export function formatTableForTerminal(rows: string[][], headers?: string[]) {
  if (!rows.length || !rows[0].length) return ''
  const table = new Table()
  if (headers && headers.length) {
    table.push(headers.map((s) => colors.bold(colors.yellow(s))))
  }
  for (const row of rows) table.push(row)
  return table.toString()
}

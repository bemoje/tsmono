import { colors } from '@bemoje/util'
import { CommandBuilder } from '@bemoje/cli'

export function printTrimAmount(cmd: CommandBuilder, filepaths: string[]) {
  const config = cmd.root.db.config
  const trimAmount = filepaths.length - config.get<number>('maxResults')
  if (trimAmount <= 0) return
  console.log(colors.yellow(`${trimAmount.toString()} results not shown.`))
}

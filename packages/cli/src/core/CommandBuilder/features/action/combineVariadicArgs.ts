import { Any, arrLast } from '@bemoje/util'
import { CommandBuilder } from '../../CommandBuilder'
import { hasVariadicArguments } from '../../../util/hasVariadicArguments'

export function combineVariadicArgs(cmd: CommandBuilder, result: Any[]) {
  if (hasVariadicArguments(cmd) && result.length && !Array.isArray(arrLast(result))) {
    const rest = result.splice(cmd.arguments.length - 1)
    result.push(rest.filter((arg) => arg != null))
  }
  return result
}

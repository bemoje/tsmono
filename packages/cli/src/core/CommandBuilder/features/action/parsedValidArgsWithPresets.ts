import { arrAssign } from '../../../util/arrAssign'
import { assertValidArguments } from '../../../util/assertValidArguments'
import { combineVariadicArgs } from './combineVariadicArgs'
import { CommandBuilder } from '../../CommandBuilder'
import { padArgsWithUndefinedUntilExpectedLength } from './padArgsWithUndefinedUntilExpectedLength'
import { parseArguments } from './parseArguments'

export function parsedValidArgsWithPresets<T>(cmd: CommandBuilder, presetArgs: T[][]) {
  const result: T[] = arrAssign([], ...presetArgs, parseArguments(cmd, cmd.$.args))
  combineVariadicArgs(cmd, result)
  assertValidArguments(cmd, result)
  return padArgsWithUndefinedUntilExpectedLength(cmd, result)
}

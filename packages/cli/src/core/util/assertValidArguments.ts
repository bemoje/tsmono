import { Any, assertThat } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Validate ALREADY PARSED args using the validators defined in the command builder.
 */
export function assertValidArguments(cmd: CommandBuilder, parsedArgs: Any[]) {
  const last = cmd.arguments.length - 1
  parsedArgs.forEach((arg, i) => {
    if (arg == null) return
    const index = i > last ? last : i
    const validators = cmd.meta.argValidators[index]
    if (!validators) return
    for (const isValid of validators) {
      assertThat(arg, isValid)
    }
  })
  return parsedArgs
}

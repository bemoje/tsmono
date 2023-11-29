import { Any, assertThat } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

/**
 * Validate ALREADY PARSED args using the validators defined in the command builder.
 */
export function assertValidArguments(cb: CommandBuilder, parsedArgs: Any[]) {
  const lastIndex = cb.$.registeredArguments.length - 1
  parsedArgs.forEach((arg, i) => {
    if (arg == null) return
    const validatorIndex = i > lastIndex ? lastIndex : i
    const validators = cb.argValidators[validatorIndex]
    if (!validators) return
    // console.log({ argIndex: i, value: arg, validators })
    for (const validator of validators) {
      assertThat(arg, validator)
    }
  })
  return parsedArgs
}

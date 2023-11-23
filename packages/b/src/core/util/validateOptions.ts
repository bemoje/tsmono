import { assertThat } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { OptionValues } from 'commander'

/**
 * Validate ALREADY PARSED options using the validators defined in the command builder.
 */
export function validateOptions(cmd: CommandBuilder, parsedOptions: OptionValues) {
  for (const [key, value] of Object.entries(parsedOptions)) {
    if (value == null) continue
    if (!cmd.optValidators[key]) continue
    for (const validator of cmd.optValidators[key]) {
      assertThat(value, validator)
    }
  }
  return parsedOptions
}

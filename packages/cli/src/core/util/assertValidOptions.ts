import { assertThat } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'
import { OptionValues } from 'commander'

/**
 * Validate ALREADY PARSED options using the validators defined in the command builder.
 */
export function assertValidOptions(cb: CommandBuilder, parsedOptions: OptionValues) {
  for (const [key, value] of Object.entries(parsedOptions)) {
    if (!cb.meta.optValidators[key]) continue
    if (value == null) continue
    for (const isValid of cb.meta.optValidators[key]) {
      assertThat(value, isValid)
    }
  }
  return parsedOptions
}

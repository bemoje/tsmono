import { strSplitCamelCase } from '@bemoje/util'

/**
 * Guesses the option's 'short' name from the 'attributeName' by splitting by camel case.
 */
export function guessOptionLongNameFromAttributeName(name: string) {
  return '--' + strSplitCamelCase(name).join('-').trim().toLowerCase()
}

import { validateError } from './validateError'
import { validateString } from './validateString'

export function validateStringArray(name: string, value: string[]) {
  if (!Array.isArray(value)) validateError(name, 'must be a string array.')
  for (const e of value) {
    validateString(name, e)
  }
}

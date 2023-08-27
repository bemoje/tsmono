import { validateString } from './validateString'
import { validationError } from './validationError'

export function validateStringArray(name: string, value: string[]) {
  if (!Array.isArray(value)) validationError(name, 'must be a string array.')
  for (const e of value) {
    validateString(name, e)
  }
}

import { validateStringType } from './validateStringType'
import { validationError } from './validationError'

export function validateStringArray(name: string, value: string[]) {
  if (!Array.isArray(value)) validationError(name, 'must be a string array.')
  for (const e of value) {
    validateStringType(name, e)
  }
}

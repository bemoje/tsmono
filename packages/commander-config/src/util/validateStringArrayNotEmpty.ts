import { validateStringArray } from './validateStringArray'
import { validationError } from './validationError'

export function validateStringArrayNotEmpty(name: string, value: string[]) {
  validateStringArray(name, value)
  if (!value.length) validationError(name, 'cannot be an empty array.')
}

import { validateError } from './validateError'
import { validateStringArray } from './validateStringArray'

export function validateStringArrayNotEmpty(name: string, value: string[]) {
  validateStringArray(name, value)
  if (!value.length) validateError(name, 'cannot be an empty array.')
}

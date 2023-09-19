import { failValidation } from '../failValidation'
import { validateStringArray } from './validateStringArray'

export function validateStringArrayNotEmpty(name: string, value: string[]) {
  validateStringArray(name, value)
  if (!value.length) failValidation(name, 'cannot be an empty array.', value)
}

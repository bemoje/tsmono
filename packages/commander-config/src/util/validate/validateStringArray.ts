import { failValidation } from '../failValidation'
import { validateStringType } from './validateStringType'

export function validateStringArray(name: string, value: string[]) {
  if (!Array.isArray(value)) failValidation(name, 'must be a string array.', value)
  for (const e of value) {
    validateStringType(name, e)
  }
}

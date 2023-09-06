import { failValidation } from './failValidation'

export function validateStringType(name: string, value: string) {
  if (typeof value !== 'string') failValidation(name, 'must be a string.')
}

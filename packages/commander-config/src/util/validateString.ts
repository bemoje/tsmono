import { failValidation } from './failValidation'

export function validateString(name: string, value: string) {
  if (typeof value !== 'string') failValidation(name, 'must be a string.')
  if (!value) failValidation(name, 'cannot be an empty string.')
}

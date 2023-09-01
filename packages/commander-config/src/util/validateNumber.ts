import { isValidNumber } from '@bemoje/validation'
import { failValidation } from './failValidation'

export function validateNumber(name: string, value: number) {
  if (!isValidNumber(value)) failValidation(name, 'must be a number.')
}

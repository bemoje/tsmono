import { isValidNumber } from '@bemoje/util'
import { failValidation } from '../failValidation'

export function validateNumber(name: string, value: number) {
  if (!isValidNumber(value)) failValidation(name, 'must be a number.', value)
}

import { isValidNumber } from '@bemoje/validation'
import { validationError } from './validationError'

export function validateNumber(name: string, value: number) {
  if (!isValidNumber(value)) validationError(name, 'must be a number.')
}

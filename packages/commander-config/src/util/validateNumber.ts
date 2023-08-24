import { isValidNumber } from '@bemoje/validation'
import { validateError } from './validateError'

export function validateNumber(name: string, value: number) {
  if (!isValidNumber(value)) validateError(name, 'must be a number.')
}

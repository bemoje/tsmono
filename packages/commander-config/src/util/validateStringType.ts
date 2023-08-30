import { validationError } from './validationError'

export function validateStringType(name: string, value: string) {
  if (typeof value !== 'string') validationError(name, 'must be a string.')
}

import { validationError } from './validationError'

export function validateString(name: string, value: string) {
  if (typeof value !== 'string') validationError(name, 'must be a string.')
  if (!value) validationError(name, 'cannot be an empty string.')
}

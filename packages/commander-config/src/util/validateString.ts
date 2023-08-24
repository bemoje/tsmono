import { validateError } from './validateError'

export function validateString(name: string, value: string) {
  if (typeof value !== 'string') validateError(name, 'must be a string.')
  if (!value) validateError(name, 'cannot be an empty string.')
}

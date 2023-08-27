import { validationError } from './validationError'

export function validateBoolean(name: string, value: boolean) {
  if (typeof value !== 'boolean') validationError(name, 'must be either true or false.')
}

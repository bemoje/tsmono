import { failValidation } from './failValidation'

export function validateBoolean(name: string, value: boolean) {
  if (typeof value !== 'boolean') failValidation(name, 'must be either true or false.')
}

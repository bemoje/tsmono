import { validateError } from './validateError'

export function validateBoolean(name: string, value: boolean) {
  if (typeof value !== 'boolean') validateError(name, 'must be either true or false.')
}

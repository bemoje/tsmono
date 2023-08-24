import { validateError } from './validateError'

export function validateInteger(name: string, value: number) {
  if (!Number.isInteger(value)) validateError(name, 'must be an integer (whole number).')
}

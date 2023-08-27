import { validationError } from './validationError'

export function validateInteger(name: string, value: number) {
  if (!Number.isInteger(value)) validationError(name, 'must be an integer (whole number).')
}

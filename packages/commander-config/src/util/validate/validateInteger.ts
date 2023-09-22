import { failValidation } from '../failValidation'

export function validateInteger(name: string, value: number) {
  if (!Number.isInteger(value)) failValidation(name, 'must be an integer', value)
}

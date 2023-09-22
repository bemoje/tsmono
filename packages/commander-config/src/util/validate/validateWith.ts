import { strSplitCamelCase } from '@bemoje/util'
import { failValidation } from '../failValidation'

export function validateWith(validate: (value: unknown) => boolean): (name: string, value: number) => void {
  return function (name: string, value: number) {
    const expectation = strSplitCamelCase(validate.name).join(' ')
    if (!validate(value)) failValidation(name, expectation, value)
  }
}

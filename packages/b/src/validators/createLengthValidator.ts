import { funSetName } from '@bemoje/util'

export function createLengthValidator(length: number) {
  return funSetName('isLengthOf' + length, function (input: { length: number }) {
    return input.length === length
  })
}

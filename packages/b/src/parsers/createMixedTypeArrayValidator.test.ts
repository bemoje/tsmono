import { createMixedTypeArrayValidator } from './createMixedTypeArrayValidator'
import { isBoolean } from '../validators/isBoolean'
import { isString } from '../validators/isString'

describe(createMixedTypeArrayValidator.name, () => {
  const isValid = createMixedTypeArrayValidator([isString, isBoolean])

  it('should return true for valid arrays', () => {
    expect(isValid(['a', true])).toBe(true)
    expect(isValid(['a', true, false])).toBe(true)
    expect(isValid([true, 'a'])).toBe(true)
  })

  it('should return false for invalid arrays', () => {
    expect(isValid([true, 'a', 2])).not.toBe(true)
  })
})

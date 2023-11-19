import { createTypedArrayValidator } from './createTypedArrayValidator'
import { PrimitiveValueValidators } from './PrimitiveValueValidators'

describe(createTypedArrayValidator.name, () => {
  const isValid = createTypedArrayValidator([PrimitiveValueValidators.string, PrimitiveValueValidators.boolean])

  it('should return true for valid arrays', () => {
    expect(isValid(['a', true])).toBe(true)
  })

  it('should return false for invalid arrays', () => {
    expect(isValid(['a', true, false])).not.toBe(true)
    expect(isValid([true, 'a'])).not.toBe(true)
    expect(isValid([true, 'a', 2])).not.toBe(true)
  })
})

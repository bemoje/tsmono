import { createMixedTypeArrayValidator } from './createMixedTypeArrayValidator'
import { PrimitiveValueValidators } from './PrimitiveValueValidators'

describe(createMixedTypeArrayValidator.name, () => {
  const isValid = createMixedTypeArrayValidator([PrimitiveValueValidators.string, PrimitiveValueValidators.boolean])

  it('should return true for valid arrays', () => {
    expect(isValid(['a', true])).toBe(true)
    expect(isValid(['a', true, false])).toBe(true)
    expect(isValid([true, 'a'])).toBe(true)
  })

  it('should return false for invalid arrays', () => {
    expect(isValid([true, 'a', 2])).not.toBe(true)
  })
})

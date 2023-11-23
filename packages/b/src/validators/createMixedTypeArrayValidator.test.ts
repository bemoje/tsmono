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

  it('should have the default name if none provided', () => {
    expect(isValid.name).toBe('isStringOrIsBooleanArray')
  })

  it('should have the given name if provided', () => {
    const isValid = createMixedTypeArrayValidator([isString, isBoolean], 'isStringOrBooleanArray')
    expect(isValid.name).toBe('isStringOrBooleanArray')
  })

  it('should throw if no name provided and not all validators are named functions', () => {
    expect(() => createMixedTypeArrayValidator([() => true])).toThrow()
  })

  it('should not throw if a name provided but not all validators are named functions', () => {
    expect(() => createMixedTypeArrayValidator([() => true], 'isAnything')).not.toThrow()
  })
})

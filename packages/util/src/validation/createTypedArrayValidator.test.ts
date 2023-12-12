import { createTypedArrayValidator } from './createTypedArrayValidator'
import { isString } from './isString'

describe(createTypedArrayValidator.name, () => {
  const isLengthOf2 = (value: unknown) => (value as string).length === 2
  const isValid = createTypedArrayValidator([isLengthOf2, isString])

  it('should return true for valid arrays', () => {
    expect(isValid(['ab'])).toBe(true)
    expect(isValid(['ab', 'cd'])).toBe(true)
  })

  it('should return false for invalid arrays', () => {
    expect(isValid(['a'])).toBe(false)
    expect(isValid(['ab', 'c'])).toBe(false)
  })

  it('should have the default name if none provided', () => {
    expect(isValid.name).toBe('isArrayWhereEachIsLengthOf2AndIsString')
  })

  it('should have the given name if provided', () => {
    const isValid = createTypedArrayValidator([isLengthOf2, isString], 'isArrOfLength2Strings')
    expect(isValid.name).toBe('isArrOfLength2Strings')
  })

  it('should throw if no name provided and not all validators are named functions', () => {
    expect(() => createTypedArrayValidator([() => true])).toThrow()
  })

  it('should not throw if a name provided but not all validators are named functions', () => {
    expect(() => createTypedArrayValidator([() => true], 'isAnything')).not.toThrow()
  })
})

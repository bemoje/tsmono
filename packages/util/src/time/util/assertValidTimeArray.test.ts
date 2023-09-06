import { assertValidTimeArray } from './assertValidTimeArray'

describe(assertValidTimeArray.name, () => {
  it('should throw an error if array length is not 4', () => {
    expect(() => assertValidTimeArray([])).toThrowError('Expected array of length 4.')
    expect(() => assertValidTimeArray([1, 2, 3])).toThrowError('Expected array of length 4.')
    expect(() => assertValidTimeArray([1, 2, 3, 4, 5])).toThrowError('Expected array of length 4.')
  })

  it('should not throw an error if assertValidTime does not throw an error', () => {
    expect(() => assertValidTimeArray([1, 2, 3, 4])).not.toThrowError()
  })
})

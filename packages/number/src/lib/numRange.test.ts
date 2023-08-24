import { numRange } from './numRange'

describe(numRange.name, () => {
  it('should return an array of numbers from start to end, inclusive', () => {
    expect(numRange(1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(numRange(-2, 2)).toEqual([-2, -1, 0, 1, 2])
    expect(numRange(0, 0)).toEqual([0])
  })

  it('should return an array with a single element when start and end are the same', () => {
    expect(numRange(3, 3)).toEqual([3])
    expect(numRange(-1, -1)).toEqual([-1])
  })

  it('should throw an error if start is greater than end', () => {
    expect(() => numRange(5, 1)).toThrowError('Expected start to be less than or equal to end. Got: 5 > 1')
    expect(() => numRange(0, -1)).toThrowError('Expected start to be less than or equal to end. Got: 0 > -1')
  })
})

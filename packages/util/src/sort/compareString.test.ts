import { compareString } from './compareString'

describe('compareString', () => {
  it('should return 0 when both strings are equal', () => {
    expect(compareString('test', 'test')).toBe(0)
  })

  it('should return a negative number when the first string is less than the second', () => {
    expect(compareString('apple', 'banana')).toBeLessThan(0)
  })

  it('should return a positive number when the first string is greater than the second', () => {
    expect(compareString('banana', 'apple')).toBeGreaterThan(0)
  })
})

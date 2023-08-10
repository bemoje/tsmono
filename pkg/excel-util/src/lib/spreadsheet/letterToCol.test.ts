import { letterToCol } from './letterToCol'

describe('letterToCol', () => {
  it('should return the correct column number for column letters', () => {
    expect(letterToCol('A')).toBe(1)
    expect(letterToCol('B')).toBe(2)
    expect(letterToCol('Z')).toBe(26)
    expect(letterToCol('AA')).toBe(27)
    expect(letterToCol('AB')).toBe(28)
    expect(letterToCol('AZ')).toBe(52)
    expect(letterToCol('BA')).toBe(53)
  })
  it('should return the correct column number for column letters with different cases', () => {
    expect(letterToCol('a')).toBe(1)
    expect(letterToCol('b')).toBe(2)
    expect(letterToCol('z')).toBe(26)
    expect(letterToCol('aa')).toBe(27)
    expect(letterToCol('ab')).toBe(28)
    expect(letterToCol('az')).toBe(52)
    expect(letterToCol('ba')).toBe(53)
  })
  it('should throw an error for invalid input', () => {
    expect(() => letterToCol('-1')).toThrow()
    expect(() => letterToCol('0')).toThrow()
  })
  it('should return the correct column number for zero-indexed column letters', () => {
    expect(letterToCol('A', true)).toBe(0)
    expect(letterToCol('B', true)).toBe(1)
    expect(letterToCol('Z', true)).toBe(25)
    expect(letterToCol('AA', true)).toBe(26)
    expect(letterToCol('AB', true)).toBe(27)
  })
})

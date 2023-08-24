import { colToLetter } from './colToLetter'

describe('colToLetter', () => {
  it('should return the correct letter for column numbers', () => {
    expect(colToLetter(1)).toBe('A')
    expect(colToLetter(2)).toBe('B')
    expect(colToLetter(26)).toBe('Z')
    expect(colToLetter(27)).toBe('AA')
    expect(colToLetter(28)).toBe('AB')
    expect(colToLetter(52)).toBe('AZ')
    expect(colToLetter(53)).toBe('BA')
  })
  it('should throw an error for invalid input', () => {
    expect(() => colToLetter(-1)).toThrow()
    expect(() => colToLetter(0)).toThrow()
    expect(() => colToLetter(1.5)).toThrow()
  })
  it('should return the correct letter for zero-indexed column numbers', () => {
    expect(colToLetter(0, true)).toBe('A')
    expect(colToLetter(1, true)).toBe('B')
    expect(colToLetter(25, true)).toBe('Z')
    expect(colToLetter(26, true)).toBe('AA')
    expect(colToLetter(27, true)).toBe('AB')
  })
})

import { tsSimpleMinifyCode } from './tsSimpleMinifyCode'

describe('tsSimpleMinifyCode', () => {
  it('should remove leading and trailing whitespace from each line', () => {
    const input = '  line1  \n  line2  \n  line3  '
    const expected = 'line1\nline2\nline3'
    expect(tsSimpleMinifyCode(input)).toBe(expected)
  })

  it('should remove all empty lines', () => {
    const input = 'line1\n\n\nline2\n\nline3'
    const expected = 'line1\nline2\nline3'
    expect(tsSimpleMinifyCode(input)).toBe(expected)
  })

  it('should remove both leading/trailing whitespace and empty lines', () => {
    const input = '  line1  \n\n  line2  \n\n  line3  '
    const expected = 'line1\nline2\nline3'
    expect(tsSimpleMinifyCode(input)).toBe(expected)
  })

  it('should return an empty string if the input is an empty string', () => {
    const input = ''
    const expected = ''
    expect(tsSimpleMinifyCode(input)).toBe(expected)
  })

  it('should return the same string if there is no leading/trailing whitespace or empty lines', () => {
    const input = 'line1\nline2\nline3'
    const expected = 'line1\nline2\nline3'
    expect(tsSimpleMinifyCode(input)).toBe(expected)
  })

  it('should handle a string with only whitespace', () => {
    const input = '   \n   \n   '
    const expected = ''
    expect(tsSimpleMinifyCode(input)).toBe(expected)
  })
})

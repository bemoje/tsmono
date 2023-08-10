import { tsDocWrapAsComment } from './tsDocWrapAsComment'

describe(tsDocWrapAsComment.name, () => {
  it('should wrap the given string into a TSDoc block comment', () => {
    const input = 'This is some text'
    const expected = ['/**', ' * This is some text', ' */'].join('\n')
    const result = tsDocWrapAsComment(input)
    expect(result).toEqual(expected)
  })

  it('should prepend each line with a TSDoc comment asterisk', () => {
    const input = 'Line 1\nLine 2\nLine 3'
    const expected = ['/**', ' * Line 1', ' * Line 2', ' * Line 3', ' */'].join('\n')
    const result = tsDocWrapAsComment(input)
    expect(result).toEqual(expected)
  })

  it('should handle an empty string', () => {
    const input = ''
    const expected = ['/**', ' * ', ' */'].join('\n')
    const result = tsDocWrapAsComment(input)
    expect(result).toEqual(expected)
  })

  it('should handle a string with leading or trailing whitespace', () => {
    const input = '  Text with whitespace  '
    const expected = ['/**', ' *   Text with whitespace  ', ' */'].join('\n')
    const result = tsDocWrapAsComment(input)
    expect(result).toEqual(expected)
  })

  it('should handle a string with empty lines', () => {
    const input = '\nLine 1\nLine 2\n\nLine 3\n'
    const expected = ['/**', ' * ', ' * Line 1', ' * Line 2', ' * ', ' * Line 3', ' * ', ' */'].join('\n')
    const result = tsDocWrapAsComment(input)
    expect(result).toEqual(expected)
  })
})

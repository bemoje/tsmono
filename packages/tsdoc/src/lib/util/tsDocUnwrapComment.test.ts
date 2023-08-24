import { tsDocUnwrapComment } from './tsDocUnwrapComment'

describe(tsDocUnwrapComment.name, () => {
  describe('valid input', () => {
    it('should unwrap the base case example.', () => {
      const actual = tsDocUnwrapComment(
        [
          '/**',
          ' * Checks if the provided (...)',
          ' * @remarks This function (...)',
          ' * @param code The source (...)',
          ' * @returns A boolean ind (...)',
          ' */',
        ].join('\n'),
      )
      const expected = [
        'Checks if the provided (...)',
        '@remarks This function (...)',
        '@param code The source (...)',
        '@returns A boolean ind (...)',
      ].join('\n')
      expect(actual).toBe(expected)
    })

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('should unwrap a valid TSDoc comment with multiple lines', () => {})
  })

  describe('invalid input', () => {
    it('should throw an error if the comment is empty', () => {
      expect(() => tsDocUnwrapComment('')).toThrowError('Invalid TSDoc comment')
    })

    it('should throw an error if the comment does not start with "/**"', () => {
      const comment = '/** Some comment */'
      expect(() => tsDocUnwrapComment(comment)).toThrowError('Invalid TSDoc comment')
    })
  })
})

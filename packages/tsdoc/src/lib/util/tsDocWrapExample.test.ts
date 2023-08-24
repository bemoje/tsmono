import { tsDocWrapExample } from './tsDocWrapExample'

describe('tsDocWrapExample', () => {
  it('should wrap a single line of code in a TSDoc block comment with an @example tag', () => {
    const code = 'console.log("Hello, World!");'
    const expected = ' * @example ```ts\n * console.log("Hello, World!");\n * ```'
    expect(tsDocWrapExample(code)).toBe(expected)
  })

  it('should wrap multiple lines of code in a TSDoc block comment with an @example tag', () => {
    const code = 'const greeting = "Hello, World!";\nconsole.log(greeting);'
    const expected = ' * @example ```ts\n * const greeting = "Hello, World!";\n * console.log(greeting);\n * ```'
    expect(tsDocWrapExample(code)).toBe(expected)
  })

  it('should handle empty strings', () => {
    const code = ''
    const expected = ' * @example ```ts\n * \n * ```'
    expect(tsDocWrapExample(code)).toBe(expected)
  })

  it('should handle strings with only whitespace', () => {
    const code = '   '
    const expected = ' * @example ```ts\n *    \n * ```'
    expect(tsDocWrapExample(code)).toBe(expected)
  })

  it('should handle strings with multiple lines of whitespace', () => {
    const code = '   \n   \n   '
    const expected = ' * @example ```ts\n *    \n *    \n *    \n * ```'
    expect(tsDocWrapExample(code)).toBe(expected)
  })
})

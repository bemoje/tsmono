import { markdownWrapCodeBlock } from './markdownWrapCodeBlock'

describe('markdownWrapCodeBlock', () => {
  it('should wrap a code string in a markdown code block', () => {
    const code = 'console.log("Hello, World!");'
    const expected = '```\nconsole.log("Hello, World!");\n```'
    expect(markdownWrapCodeBlock(code)).toBe(expected)
  })

  it('should wrap a code string in a markdown code block with a specified language', () => {
    const code = 'console.log("Hello, World!");'
    const language = 'javascript'
    const expected = '```javascript\nconsole.log("Hello, World!");\n```'
    expect(markdownWrapCodeBlock(code, language)).toBe(expected)
  })

  it('should trim leading and trailing whitespace from the code string', () => {
    const code = '   console.log("Hello, World!");   '
    const expected = '```\nconsole.log("Hello, World!");\n```'
    expect(markdownWrapCodeBlock(code)).toBe(expected)
  })

  it('should handle an empty code string', () => {
    const code = ''
    const expected = '```\n\n```'
    expect(markdownWrapCodeBlock(code)).toBe(expected)
  })

  it('should handle an empty language string', () => {
    const code = 'console.log("Hello, World!");'
    const language = ''
    const expected = '```\nconsole.log("Hello, World!");\n```'
    expect(markdownWrapCodeBlock(code, language)).toBe(expected)
  })
})

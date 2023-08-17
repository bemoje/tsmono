import { parseMarkdownCodeBlock } from './parseMarkdownCodeBlock'

describe('parseMarkdownCodeBlock', () => {
  it('should parse language and code from a markdown code block', () => {
    const markdown = "```javascript\nconsole.log('Hello, world!');\n```"
    const result = parseMarkdownCodeBlock(markdown)
    expect(result).toEqual({
      language: 'javascript',
      code: "console.log('Hello, world!');",
    })
  })

  it('should trim extra spaces from the code', () => {
    const markdown = "```javascript\n  console.log('Hello, world!');  \n```"
    const result = parseMarkdownCodeBlock(markdown)
    expect(result).toEqual({
      language: 'javascript',
      code: "console.log('Hello, world!');",
    })
  })

  it('should return undefined language if not specified', () => {
    const markdown = "```\nconsole.log('Hello, world!');\n```"
    const result = parseMarkdownCodeBlock(markdown)
    expect(result).toEqual({
      language: undefined,
      code: "console.log('Hello, world!');",
    })
  })

  it('should throw an error if the markdown code block cannot be parsed', () => {
    const markdown = "console.log('Hello, world!');"
    expect(() => parseMarkdownCodeBlock(markdown)).toThrow('Could not parse the markdown code block.')
  })

  it('should handle multiline code blocks', () => {
    const markdown = "```javascript\nconsole.log('Hello, world!');\nconsole.log('Goodbye, world!');\n```"
    const result = parseMarkdownCodeBlock(markdown)
    expect(result).toEqual({
      language: 'javascript',
      code: "console.log('Hello, world!');\nconsole.log('Goodbye, world!');",
    })
  })
})

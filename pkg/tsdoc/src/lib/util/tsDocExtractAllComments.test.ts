import type { IExtractedTsDocComment } from '../types/IExtractedTsDocComment'
import { tsDocExtractAllComments } from './tsDocExtractAllComments'

describe(tsDocExtractAllComments.name, () => {
  it('should extract a single TSDoc block comment', () => {
    const code = [
      '/**',
      ' * This is a comment.',
      ' */',
      //
    ].join('\n')
    const comments: IExtractedTsDocComment[] = Array.from(tsDocExtractAllComments(code))
    expect(comments.length).toBe(1)
    expect(comments[0].start).toBe(0)
    expect(comments[0].end).toBe(2)
    expect(comments[0].match).toBe('/**\n * This is a comment.\n */')
    expect(comments[0].nextLine).toBeUndefined()
  })

  it('should extract multiple TSDoc block comments', () => {
    const code = [
      '/**',
      ' * Comment 1.',
      ' */',
      'some code...',
      '/**',
      ' * Comment 2.',
      ' */',
      'some more code...',
    ].join('\n')
    const comments: IExtractedTsDocComment[] = Array.from(tsDocExtractAllComments(code))
    expect(comments.length).toBe(2)
    expect(comments[0].start).toBe(0)
    expect(comments[0].end).toBe(2)
    expect(comments[0].match).toBe('/**\n * Comment 1.\n */')
    expect(comments[0].nextLine).toBe('some code...')
    expect(comments[1].start).toBe(4)
    expect(comments[1].end).toBe(6)
    expect(comments[1].match).toBe('/**\n * Comment 2.\n */')
    expect(comments[1].nextLine).toBe('some more code...')
  })

  it('should handle nested TSDoc block comments', () => {
    const code = [
      '/**',
      ' * Comment 1.',
      ' * ',
      ' * /**',
      ' *  * Nested comment.',
      ' *  */',
      ' * ',
      ' * More comment 1.',
      ' */',
    ].join('\n')
    const comments: IExtractedTsDocComment[] = Array.from(tsDocExtractAllComments(code))
    expect(comments.length).toBe(1)
    expect(comments[0].start).toBe(0)
    expect(comments[0].end).toBe(8)
    expect(comments[0].match).toBe(
      '/**\n * Comment 1.\n * \n * /**\n *  * Nested comment.\n *  */\n * \n * More comment 1.\n */',
    )
    expect(comments[0].nextLine).toBeUndefined()
  })

  it('should not extract TSDoc block comments with missing start tag', () => {
    const code = `
      /**
       * Comment 1.
    `.trim()
    const comments: IExtractedTsDocComment[] = Array.from(tsDocExtractAllComments(code))
    expect(comments.length).toBe(0)
  })

  it('should not extract TSDoc block comments with missing end tag', () => {
    const code = `
      /**
       * Comment 1.
      `.trim()
    const comments: IExtractedTsDocComment[] = Array.from(tsDocExtractAllComments(code))
    expect(comments.length).toBe(0)
  })

  it('should not extract TSDoc block comments with missing start and end tags', () => {
    const code = `
      /**
       * Comment 1.
      `.trim()
    const comments: IExtractedTsDocComment[] = Array.from(tsDocExtractAllComments(code))
    expect(comments.length).toBe(0)
  })

  it('should handle empty code string', () => {
    const code = ''
    const comments: IExtractedTsDocComment[] = Array.from(tsDocExtractAllComments(code))
    expect(comments.length).toBe(0)
  })
})

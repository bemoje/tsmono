import { tsDocExtractFirstComment } from './tsDocExtractFirstComment'
import { IExtractedTsDocComment } from '../types/IExtractedTsDocComment'

describe(tsDocExtractFirstComment.name, () => {
  it('should extract a single TSDoc block comment', () => {
    const code = [
      '/**',
      ' * This is a comment.',
      ' */',
      //
    ].join('\n')
    const comments = tsDocExtractFirstComment(code) as IExtractedTsDocComment
    expect(comments).toBeDefined()
    expect(comments.start).toBe(0)
    expect(comments.end).toBe(2)
    expect(comments.match).toBe('/**\n * This is a comment.\n */')
    expect(comments.nextLine).toBeUndefined()
  })
})

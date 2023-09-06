import { normalizeLineLengths } from './normalizeLineLengths'

describe('normalizeLineLengths', () => {
  it('should not just merge short sentences when they are about same length', () => {
    const sentences = ['This is a short sentence.', 'This is another short sentence.', 'This is a long sentence.']
    const result = normalizeLineLengths(sentences)
    expect(result).toEqual(sentences)
  })

  it('should merge short sentences when near long ones', () => {
    const sentences = [
      'This is a short sentence.',
      'This is another short sentence.',
      'This is a very long sentence that should not be merged with other sentences because it is too long.',
    ]
    const result = normalizeLineLengths(sentences)
    expect(result).toEqual([
      'This is a short sentence. This is another short sentence.',
      'This is a very long sentence that should not be merged with other sentences because it is too long.',
    ])
  })
})

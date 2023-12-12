import { ParserSelector } from './ParserSelector'

describe(ParserSelector.name, () => {
  it('should be an abstract class', () => {
    expect(typeof ParserSelector).toBe('function')
  })
})

import { getJsonIndentation } from './getJsonIndentation'

describe(getJsonIndentation.name, () => {
  it('should return 0 for unformatted json strings', () => {
    expect(getJsonIndentation(`{}`)).toBe(0)
    expect(getJsonIndentation(`{asd:25}`)).toBe(0)
    expect(getJsonIndentation(`[1,2,4]`)).toBe(0)
  })

  it('should see 2 indentations', () => {
    expect(getJsonIndentation('[\n  1,\n  2,\n  4\n]')).toBe(2)
  })

  it('should see 3 indentations', () => {
    expect(getJsonIndentation('[\n   1,\n   2,\n   4\n]')).toBe(3)
  })
})

import { tsStripDeclSourceMapComments } from './tsStripDeclSourceMapComments'

describe('tsStripDeclSourceMapComments', () => {
  it('Strips source map comment and ensures trailing newline.', () => {
    const actual = tsStripDeclSourceMapComments(
      ['// some code', '//# sourceMappingURL=createEncapsulatingRegex.d.ts.map', ''].join('\n'),
    )
    const expected = '// some code\n'
    expect(actual).toBe(expected)
  })
})

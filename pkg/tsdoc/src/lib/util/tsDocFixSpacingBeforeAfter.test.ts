import { tsDocFixSpacingBeforeAfter } from './tsDocFixSpacingBeforeAfter'

describe(tsDocFixSpacingBeforeAfter.name, () => {
  it('fixes spacing both before and after with and without indents', () => {
    const code = [
      'const a = 1;',
      '/**',
      ' * hi',
      ' */',
      '',
      'class A {',
      '  /**',
      '   * hello',
      '   */',
      '',
      '  constructor() {',
      '    //',
      '  }',
      '}',
    ].join('\n')
    expect(tsDocFixSpacingBeforeAfter(code)).toBe(
      [
        'const a = 1;',
        '',
        '/**',
        ' * hi',
        ' */',
        'class A {',
        '',
        '  /**',
        '   * hello',
        '   */',
        '  constructor() {',
        '    //',
        '  }',
        '}',
      ].join('\n'),
    )
  })
})

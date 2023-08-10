import { tsDocStripExample } from './tsDocStripExample'

describe(tsDocStripExample.name, () => {
  it('should strip the "example" tag', () => {
    const code = [
      'const a = 1',
      '',
      '/**',
      ' * Adds two numbers.',
      ' * @returns an integer',
      ' * @example ```ts',
      ' * add(1, 2)',
      ' * ```',
      ' */',
      'function add(a: number, b: number): number {}',
    ].join('\n')

    expect(tsDocStripExample(code)).toBe(
      [
        'const a = 1',
        '',
        '/**',
        ' * Adds two numbers.',
        ' * @returns an integer',
        ' */',
        'function add(a: number, b: number): number {}',
      ].join('\n'),
    )
  })

  it('should strip multiple "example" tags', () => {
    const code = [
      '/**',
      ' * Adds two numbers.',
      ' * @returns an integer',
      ' * @example ```ts',
      ' * add(1, 2)',
      ' * ```',
      ' * @example ```ts',
      ' * add(2, 3)',
      ' * ```',
      ' */',
    ].join('\n')

    expect(tsDocStripExample(code)).toBe(
      [
        '/**',
        ' * Adds two numbers.',
        ' * @returns an integer',
        ' */',
        //
      ].join('\n'),
    )
  })

  it('should handle more than one TSDoc block comment in the source code.', () => {
    const code = [
      'const a = 1',
      '',
      '/**',
      ' * Adds two numbers.',
      ' * @returns an integer',
      ' * @example ```ts',
      ' * add(1, 2)',
      ' * ```',
      ' */',
      'function add(a: number, b: number): number {}',
      '',
      'const a = 1',
      '',
      '/**',
      ' * Adds two numbers.',
      ' * @returns an integer',
      ' * @example ```ts',
      ' * add(1, 2)',
      ' * ```',
      ' */',
      'function add(a: number, b: number): number {}',
    ].join('\n')

    expect(tsDocStripExample(code)).toBe(
      [
        'const a = 1',
        '',
        '/**',
        ' * Adds two numbers.',
        ' * @returns an integer',
        ' */',
        'function add(a: number, b: number): number {}',
        '',
        'const a = 1',
        '',
        '/**',
        ' * Adds two numbers.',
        ' * @returns an integer',
        ' */',
        'function add(a: number, b: number): number {}',
      ].join('\n'),
    )
  })
})

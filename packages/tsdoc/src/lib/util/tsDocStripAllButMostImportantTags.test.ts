import { tsDocStripAllButMostImportantTags } from './tsDocStripAllButMostImportantTags'

describe(tsDocStripAllButMostImportantTags.name, () => {
  it('should strip all tags except for the "description", "throws" and "param" tags', () => {
    const code = [
      'const a = 1',
      '',
      '/**',
      ' * Adds two numbers.',
      ' * @param a The first number.',
      ' * @param b The second number.',
      ' * @returns The sum of a and b.',
      ' * @throws If a or b is not a number.',
      ' * @example ...',
      ' */',
      'function add(a: number, b: number): number {}',
    ].join('\n')

    expect(tsDocStripAllButMostImportantTags(code)).toBe(
      [
        'const a = 1',
        '',
        '/**',
        ' * Adds two numbers.',
        ' * @param a The first number.',
        ' * @param b The second number.',
        ' * @throws If a or b is not a number.',
        ' */',
        'function add(a: number, b: number): number {}',
      ].join('\n'),
    )
  })

  it('should handle more than one TSDoc block comment in the source code.', () => {
    const code = [
      '/**',
      ' * This explains the thing.',
      ' * @returns an integer.',
      ' * @example ...',
      ' */',
      '',
      '/**',
      ' * This explains the other thing.',
      ' * @throws an error.',
      ' * @example ...',
      ' */',
    ].join('\n')

    expect(tsDocStripAllButMostImportantTags(code)).toBe(
      [
        '/**',
        ' * This explains the thing.',
        ' */',
        '',
        '/**',
        ' * This explains the other thing.',
        ' * @throws an error.',
        ' */',
      ].join('\n'),
    )
  })
})

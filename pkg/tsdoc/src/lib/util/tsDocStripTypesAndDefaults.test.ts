import { tsDocStripTypesAndDefaults } from './tsDocStripTypesAndDefaults'

describe(tsDocStripTypesAndDefaults.name, () => {
  it('should strip type from returns tag', () => {
    const code = [
      '/**',
      ' * @returns {string} a string',
      ' */',
      //
    ].join('\n')
    expect(tsDocStripTypesAndDefaults(code)).toBe(
      [
        '/**',
        ' * @returns a string',
        ' */',
        //
      ].join('\n'),
    )
  })

  it('should strip type from param tag', () => {
    const code = [
      '/**',
      ' * @param {string} name The name',
      ' */',
      //
    ].join('\n')
    expect(tsDocStripTypesAndDefaults(code)).toBe(
      [
        '/**',
        ' * @param name The name',
        ' */',
        //
      ].join('\n'),
    )
  })

  it('should strip the default value from named tag.', () => {
    const code = [
      '/**',
      ' * @param [name=John] The name',
      ' */',
      //
    ].join('\n')
    expect(tsDocStripTypesAndDefaults(code)).toBe(
      [
        '/**',
        ' * @param name The name',
        ' */',
        //
      ].join('\n'),
    )
  })

  it('should strip both type and default value from named tag.', () => {
    const code = [
      '/**',
      ' * @param {(string|string[])} [name=John] The name',
      ' */',
      //
    ].join('\n')
    expect(tsDocStripTypesAndDefaults(code)).toBe(
      [
        '/**',
        ' * @param name The name',
        ' */',
        //
      ].join('\n'),
    )
  })
})

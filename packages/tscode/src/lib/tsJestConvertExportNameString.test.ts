import { tsJestConvertExportNameString } from './tsJestConvertExportNameString'

describe(tsJestConvertExportNameString.name, () => {
  const expected = [
    '',
    'describe(someFunction.name, () => {',
    '  return',
    '})',
    //
  ].join('\n')

  it('should handle with single quotes.', () => {
    const code = [
      '',
      "describe('someFunction', () => {",
      '  return',
      '})',
      //
    ].join('\n')
    expect(tsJestConvertExportNameString(code, 'someFunction')).toBe(expected)
  })

  it('should handle with double quotes.', () => {
    const code = [
      '',
      'describe("someFunction", () => {',
      '  return',
      '})',
      //
    ].join('\n')
    expect(tsJestConvertExportNameString(code, 'someFunction')).toBe(expected)
  })
})

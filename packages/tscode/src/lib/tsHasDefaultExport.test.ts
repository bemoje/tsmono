import { tsHasDefaultExport } from './tsHasDefaultExport'

describe(tsHasDefaultExport.name, () => {
  it('should return true if the code has a default export', () => {
    const code = 'export default class MyClass {}'
    expect(tsHasDefaultExport(code)).toBe(true)
  })

  it('should return false if the code does not have a default export', () => {
    const code = 'export class MyClass {}'
    expect(tsHasDefaultExport(code)).toBe(false)
  })

  it('should handle multi-line code', () => {
    const code = ['class MyClass {', '  property: string;', '}', '', 'export default MyClass;'].join('\n')
    expect(tsHasDefaultExport(code)).toBe(true)
  })

  it('should not ignore leading whitespace', () => {
    const code = ' export default function myFunction() {}'
    expect(tsHasDefaultExport(code)).toBe(false)
  })

  it('should ignore trailing whitespace', () => {
    const code = 'export default class MyClass { } '
    expect(tsHasDefaultExport(code)).toBe(true)
  })

  it('should ignore comments', () => {
    const code = [
      '// This is a comment',
      '/*',
      '  This is a multiline',
      '  comment',
      '*/',
      'export default interface MyInterface {',
      '}',
    ].join('\n')
    expect(tsHasDefaultExport(code)).toBe(true)
  })
})

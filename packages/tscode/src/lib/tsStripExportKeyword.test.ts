import { tsStripExportKeyword } from './tsStripExportKeyword'

describe('tsStripExportKeyword', () => {
  it('should remove "export" keyword from the beginning of each line', () => {
    const source = `export const a = 1;\nexport function b() {}\nexport class C {}`
    const expected = `const a = 1;\nfunction b() {}\nclass C {}`
    expect(tsStripExportKeyword(source)).toBe(expected)
  })

  it('should not remove "export" keyword if it is not at the beginning of a line', () => {
    const source = `const a = 'export';\nfunction b() { return 'export'; }\nclass C { export = 'export'; }`
    const expected = `const a = 'export';\nfunction b() { return 'export'; }\nclass C { export = 'export'; }`
    expect(tsStripExportKeyword(source)).toBe(expected)
  })

  it('should return the same string if there is no "export" keyword', () => {
    const source = `const a = 1;\nfunction b() {}\nclass C {}`
    const expected = `const a = 1;\nfunction b() {}\nclass C {}`
    expect(tsStripExportKeyword(source)).toBe(expected)
  })

  it('should return an empty string if the source is an empty string', () => {
    const source = ''
    const expected = ''
    expect(tsStripExportKeyword(source)).toBe(expected)
  })

  it('should handle multiline strings correctly', () => {
    const source = `export const a = 1;\nexport function b() {\n  return 'export';\n}\nexport class C {}`
    const expected = `const a = 1;\nfunction b() {\n  return 'export';\n}\nclass C {}`
    expect(tsStripExportKeyword(source)).toBe(expected)
  })
})

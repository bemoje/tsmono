import { tsCountExports } from './tsCountExports'

describe(tsCountExports.name, () => {
  it('should return 0 when there are no export statements', () => {
    const code = 'const a = 1;\nconst b = 2;\nconst c = 3;'
    const result = tsCountExports(code)
    expect(result).toBe(0)
  })

  it('should return the correct number of export statements', () => {
    const code = 'export const a = 1;\nexport function b() {}\nexport class C {}'
    const result = tsCountExports(code)
    expect(result).toBe(3)
  })

  it('should return 0 when the code is an empty string', () => {
    const code = ''
    const result = tsCountExports(code)
    expect(result).toBe(0)
  })

  it('should return 0 when the code does not match the export statement regex', () => {
    const code = 'exporting const a = 1;\nexporting function b() {}\nexporting class C {}'
    const result = tsCountExports(code)
    expect(result).toBe(0)
  })
})

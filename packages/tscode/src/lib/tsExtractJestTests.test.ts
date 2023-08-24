import { tsExtractJestTests } from './tsExtractJestTests'

describe(tsExtractJestTests.name, () => {
  it('should extract Jest tests from TypeScript code', () => {
    const code = `

describe('test suite 1', () => {

  it('should test case 1', () => {
    expect(true).toBe(true)
  })
})

describe('test suite 2', () => {

  it('should test case 2', () => {
    expect(1 + 1).toBe(2)
  })

  it('should test case 3', () => {
    expect(2 + 2).toBe(4)
  })
})
    `
    const extractedTests = tsExtractJestTests(code)
    expect(extractedTests).toBe(
      `
describe('test suite 1', () => {

  it('should test case 1', () => {
    expect(true).toBe(true)
  })
})

describe('test suite 2', () => {

  it('should test case 2', () => {
    expect(1 + 1).toBe(2)
  })

  it('should test case 3', () => {
    expect(2 + 2).toBe(4)
  })
})
    `.trim(),
    )
  })

  it('should throw an error if the input code does not contain Jest tests', () => {
    const code = `
      console.log('Hello, world!')
    `
    expect(() => {
      tsExtractJestTests(code)
    }).toThrow('Could not parse the tests from the input source code.')
  })

  it('should handle multi-line strings properly', () => {
    const code = `
const message = 'Hello,
world!'

describe('test suite', () => {
  it('should test case', () => {
    expect(message).toBe('Hello,
    world!')
  })
})
    `
    const extractedTests = tsExtractJestTests(code)
    expect(extractedTests).toBe(
      `
describe('test suite', () => {
  it('should test case', () => {
    expect(message).toBe('Hello,
    world!')
  })
})
    `.trim(),
    )
  })
})

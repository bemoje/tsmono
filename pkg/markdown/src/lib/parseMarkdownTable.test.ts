import { parseMarkdownTable } from './parseMarkdownTable'

describe('parseMarkdownTable', () => {
  it('should return an empty array if the input string is empty', () => {
    const result = parseMarkdownTable('')
    expect(result).toEqual([])
  })

  it('should return an empty array if the input string contains only whitespace', () => {
    const result = parseMarkdownTable('   ')
    expect(result).toEqual([])
  })

  it('should return an empty array if the input string contains only empty lines', () => {
    const result = parseMarkdownTable('\n\n\n')
    expect(result).toEqual([])
  })

  it('should return a 2D array representing the table', () => {
    const input = `
      | Header 1 | Header 2 |
      | -------- | -------- |
      | Cell 1   | Cell 2   |
    `
    const result = parseMarkdownTable(input)
    expect(result).toEqual([
      ['Header 1', 'Header 2'],
      ['Cell 1', 'Cell 2'],
    ])
  })

  it('should trim leading/trailing whitespace from each row', () => {
    const input = `
      | Header 1 | Header 2 |
      | -------- | -------- |
      |   Cell 1   |   Cell 2   |
    `
    const result = parseMarkdownTable(input)
    expect(result).toEqual([
      ['Header 1', 'Header 2'],
      ['Cell 1', 'Cell 2'],
    ])
  })

  it('should handle empty cells', () => {
    const input = `
      | Header 1 | Header 2 |
      | -------- | -------- |
      | Cell 1   |          |
    `
    const result = parseMarkdownTable(input)
    expect(result).toEqual([
      ['Header 1', 'Header 2'],
      ['Cell 1', ''],
    ])
  })

  it('should handle cells with leading/trailing whitespace', () => {
    const input = `
      | Header 1 | Header 2 |
      | -------- | -------- |
      |   Cell 1   |   Cell 2   |
    `
    const result = parseMarkdownTable(input)
    expect(result).toEqual([
      ['Header 1', 'Header 2'],
      ['Cell 1', 'Cell 2'],
    ])
  })

  it('should handle tables with more than two rows', () => {
    const input = `
      | Header 1 | Header 2 |
      | -------- | -------- |
      | Cell 1   | Cell 2   |
      | Cell 3   | Cell 4   |
    `
    const result = parseMarkdownTable(input)
    expect(result).toEqual([
      ['Header 1', 'Header 2'],
      ['Cell 1', 'Cell 2'],
      ['Cell 3', 'Cell 4'],
    ])
  })

  it('should handle tables with more than two columns', () => {
    const input = `
      | Header 1 | Header 2 | Header 3 |
      | -------- | -------- | -------- |
      | Cell 1   | Cell 2   | Cell 3   |
    `
    const result = parseMarkdownTable(input)
    expect(result).toEqual([
      ['Header 1', 'Header 2', 'Header 3'],
      ['Cell 1', 'Cell 2', 'Cell 3'],
    ])
  })

  it('should handle tables with empty rows', () => {
    const input = `
      | Header 1 | Header 2 |
      | -------- | -------- |
      | Cell 1   | Cell 2   |

      | Cell 3   | Cell 4   |
    `
    const result = parseMarkdownTable(input)
    expect(result).toEqual([
      ['Header 1', 'Header 2'],
      ['Cell 1', 'Cell 2'],
      ['Cell 3', 'Cell 4'],
    ])
  })
})

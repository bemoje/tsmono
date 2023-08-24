import { tsDocRemoveEmptyLines } from './tsDocRemoveEmptyLines'

describe(tsDocRemoveEmptyLines.name, () => {
  it('should return an empty string when given an empty string', () => {
    const input = ''
    const expectedOutput = ''
    const result = tsDocRemoveEmptyLines(input)
    expect(result).toBe(expectedOutput)
  })

  it('should return the input string unchanged when it does not contain empty lines', () => {
    const input = `/**
     * Removes all empty lines from the given string.
     * @param string The string from which to remove empty lines.
     * @returns The input string with all empty lines removed.
     * @returns The provided string with all empty lines removed.
     */
    export function tsDocRemoveEmptyLines(string: string): string {
      return string.replace(/^ *\\* *$/gm, '')
    }`
    const expectedOutput = `/**
     * Removes all empty lines from the given string.
     * @param string The string from which to remove empty lines.
     * @returns The input string with all empty lines removed.
     * @returns The provided string with all empty lines removed.
     */
    export function tsDocRemoveEmptyLines(string: string): string {
      return string.replace(/^ *\\* *$/gm, '')
    }`
    const result = tsDocRemoveEmptyLines(input)
    expect(result).toBe(expectedOutput)
  })

  it('should remove empty lines correctly when the input string starts with an empty line', () => {
    const input = `
    /**
     * Removes all empty lines from the given string.
     * @param string The string from which to remove empty lines.
     * 
     * @returns The input string with all empty lines removed.
     * 
     * @returns The provided string with all empty lines removed.
     */
    export function tsDocRemoveEmptyLines(string: string): string {
      return string.replace(/^ *\\* *$/gm, '')
    }`
    const expectedOutput = `
    /**
     * Removes all empty lines from the given string.
     * @param string The string from which to remove empty lines.
     * @returns The input string with all empty lines removed.
     * @returns The provided string with all empty lines removed.
     */
    export function tsDocRemoveEmptyLines(string: string): string {
      return string.replace(/^ *\\* *$/gm, '')
    }`
    const result = tsDocRemoveEmptyLines(input)
    expect(result).toBe(expectedOutput)
  })
})

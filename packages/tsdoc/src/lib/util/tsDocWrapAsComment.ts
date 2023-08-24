import { strPrependLines } from '@bemoje/string'

/**
 * Wraps a given string into a TSDoc block comment.
 * @remarks This function is useful when you want to generate TSDoc comments programmatically.
 * @param string The string to be wrapped into a TSDoc block comment.
 * @returns The input string wrapped into a TSDoc block comment.
 */
export function tsDocWrapAsComment(string: string): string {
  return ['/**', strPrependLines(string, ' * '), ' */'].join('\n')
}

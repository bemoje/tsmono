/**
 * Wraps a given code string in a markdown code block.
 * @param code The code string to be wrapped.
 * @param language The language of the code string. Default is an empty string.
 * @remarks This function is useful when you want to format a string of code to be displayed in markdown.
 * @returns The code string wrapped in a markdown code block.
 * @example ```ts
 * markdownWrapCodeBlock("console.log('Hello, World!')", "javascript");;
 * //=> "```javascript\nconsole.log('Hello, World!')\n```"
 * ```
 */
export function markdownWrapCodeBlock(code: string, language = ''): string {
  return '```' + language + '\n' + code.trim() + '\n```'
}

import { rexecFirstMatch } from '@bemoje/string'

/**
 * Parse language and code content from a markdown code block.
 * @param string The markdown string containing the code block.
 * @remarks This function uses regular expressions to parse the markdown code block.
 * @returns An object containing the language and the code from the markdown code block.
 * @throws Throws an error if the markdown code block cannot be parsed.
 * @example ```ts
 * const markdown = "```javascript\nconsole.log('Hello, World!');\n```";
 * parseMarkdownCodeBlock(markdown);
 * //=> { language: "javascript", code: "console.log('Hello, World!');" }
 * ```
 */
export function parseMarkdownCodeBlock(string: string): { language: string; code: string } {
  const groups = rexecFirstMatch(/```(?<language>\w+)?(?<code>.+)```/gs, string.trim())?.groups
  if (!groups) throw new Error('Could not parse the markdown code block.')
  const { language, code } = groups
  return { language, code: code.trim() }
}

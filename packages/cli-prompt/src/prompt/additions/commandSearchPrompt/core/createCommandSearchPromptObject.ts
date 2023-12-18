import colors from 'ansi-colors'
import { createSearchPromptObject } from '../../searchPrompt/core/createSearchPromptObject'
import { ISearchPromptOptions } from '../../searchPrompt/core/ISearchPromptOptions'
import { PromptObject } from 'prompts'

/**
 * Create a command search prompt object that can be run with `prompts()` from npm package: `prompts`.
 * The point of this would be to run them in series.
 * To run run a prompt directly, use @see commandSearchPrompt
 *
 * @param name - The name of the prompt
 * @param data - The list of commands to search through
 * @param options - The options
 */
export function createCommandSearchPromptObject(
  name: string,
  data: string[],
  options: Omit<ISearchPromptOptions, 'keywordDelimiter' | 'preRender'>
): PromptObject {
  return createSearchPromptObject(name, data, {
    separator: ' ',
    preRender: (parsed: string[]): string[] => {
      if (!parsed.length) return parsed
      return parsed.map((str: string, i) => {
        if (i === parsed.length - 1) return str
        return colors.dim(str)
      })
    },
    ...options,
  })
}

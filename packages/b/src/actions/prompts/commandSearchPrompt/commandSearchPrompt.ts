import prompts from 'prompts'
import { ISearchPromptOptions } from '../searchPrompt/core/ISearchPromptOptions'
import { getSearchPromptMetaData } from '../searchPrompt/core/getSearchPromptMetaData'
import { ICommandSearchPromptResult } from './ICommandSearchPromptResult'
import { createCommandSearchPromptObject } from './core/createCommandSearchPromptObject'

/**
 * Start a command-line prompt in which the user can search a provided list of CLI commands.
 * Use the `:` character (configurable) to mean the rest of the input is arguments.
 *
 * @param data - The list to search
 * @param options - options
 *
 * @returns the user input, its resulting matches, the match selected by the user
 *
 * @remarks
 * Returns
 * 1 100% matches always from beginning of searched strings/words
 * 2 100% matches anywhere in the searched strings/words
 *
 * If the first category can be narrowed down to exactly one result,
 * then it is immediately returned and the other category discarded.
 */
export async function commandSearchPrompt(
  data: string[],
  options: Omit<ISearchPromptOptions, 'toKeywords' | 'preRender'>
): Promise<ICommandSearchPromptResult> {
  const _options = options as ISearchPromptOptions
  const prompt = createCommandSearchPromptObject('commandSearch', data, _options)
  const oSelected = await prompts(prompt)
  const metadata = getSearchPromptMetaData(prompt)
  const selected = oSelected['commandSearch']
  const input = metadata.originalInput
  const matches = metadata.result.map((choice) => choice.value) || []
  const args = metadata.inputAfterStop
  return { input, matches, selected, args }
}

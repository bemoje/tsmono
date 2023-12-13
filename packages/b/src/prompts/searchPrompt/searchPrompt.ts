import prompts from 'prompts'
import { createSearchPromptObject } from './core/createSearchPromptObject'
import { getSearchPromptMetaData } from './core/getSearchPromptMetaData'
import { ISearchPromptOptions } from './core/ISearchPromptOptions'
import { ISearchPromptResult } from './core/ISearchPromptResult'

/**
 * Start a command-line prompt in which the user can search a provided list.
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
export async function searchPrompt(data: string[], options?: ISearchPromptOptions): Promise<ISearchPromptResult> {
  const _options = options as ISearchPromptOptions
  const prompt = createSearchPromptObject('search', data, _options)
  const oSelected = await prompts(prompt)
  const metadata = getSearchPromptMetaData(prompt)
  const selected = oSelected['search']
  const input = metadata.originalInput
  const matches = metadata.result.map((choice) => choice.value) || []
  return { input, matches, selected }
}

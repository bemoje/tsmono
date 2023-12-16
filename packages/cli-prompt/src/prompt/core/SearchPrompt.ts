import { AbstractUserPrompt } from './AbstractUserPrompt'
import { IAutocompletePrompt, TFormat, TStyle } from './types'
import { ISearchPromptOptions } from '../additions/searchPrompt/core/ISearchPromptOptions'
import { Options } from 'prompts'
import { searchPrompt } from '../additions/searchPrompt/searchPrompt'

/**
 * Interactive autocomplete user prompts in the terminal.
 */
export class SearchPrompt<T extends string = string> extends AbstractUserPrompt<IAutocompletePrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, callback?: (self: SearchPrompt<T>) => void) {
    super('autocomplete', name, '0')
    if (callback) callback(this)
  }

  /**
   * An array of options/choices for the user to select.
   */
  choices(data: string[]) {
    Object.defineProperty(this.data, 'choices', {
      value: data,
    })
    return this
  }

  /**
   * Default value
   */
  initial(initial: T) {
    this.data['initial'] = initial
    return this
  }

  /**
   * The first ESCAPE keypress will clear the input
   */
  clearFirst(clearFirst = true) {
    this.data['clearFirst'] = clearFirst
    return this
  }

  /**
   * Max number of results to show. Defaults to 25
   */
  limit(limit = 25) {
    this.data['limit'] = limit
    return this
  }

  /**
   * The delimiter to use to split the user input into keywords.
   * Defaults to ' ' (space).
   */
  separator(delim = ' ') {
    this.data['separator'] = delim
    return this
  }

  /**
   * When this string is encountered, the input coming after will not be considered for searching. Defaults to ':'
   */
  searchStopSequence(stop: string) {
    Object.defineProperty(this.data, 'searchStopSequence', { value: stop })
    return this
  }

  /**
   * Filtering options.
   * @property includes - If true, then the search results will include keyword-matches that match anywhere in the string. Defaults to 'true'
   * @property startsWith - If true, then the search results will include beginning-of-word-matches. Defaults to 'true'
   */
  filtering(filtering: { includes?: boolean; startsWith?: boolean }) {
    Object.defineProperty(this.data, 'filtering', { value: filtering })
    return this
  }

  /**
   * A function to pre-render each string in the search data before searching has begun.
   * This is useful if the same string formatting will be applied to all returned search results.
   *
   * @param original - The original (or pre-rendered) string.
   */
  preRender(preRender: (original: string[]) => string[]) {
    Object.defineProperty(this.data, 'preRender', { value: preRender })
    return this
  }

  /**
   * A function to render the search results.
   *
   * @param original - The original (or pre-rendered) string.
   * @param keywords - The keywords that matched the original string.
   */
  render(render: (original: string[], keywords: string[]) => string) {
    Object.defineProperty(this.data, 'render', { value: render })
    return this
  }

  /**
   * Receive user input. The returned value will be added to the response object
   */
  format(format: TFormat<T>) {
    this.data['format'] = format
    return this
  }

  /**
   * Render style
   */
  style(style: TStyle = 'default') {
    this.data['style'] = style
    return this
  }

  override async run(options?: Options) {
    return await searchPrompt(this.data.choices as unknown as string[], this.data as ISearchPromptOptions, options)
  }
}

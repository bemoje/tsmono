import { AbstractUserPrompt } from './AbstractUserPrompt'
import { Choice } from 'prompts'
import { IAutocompletePrompt, TFormat, TOnRender, TStyle, TSuggest } from './types'

/**
 * Interactive autocomplete user prompts in the terminal.
 */
export class AutocompletePrompt<T extends string | number | boolean = string> extends AbstractUserPrompt<
  IAutocompletePrompt<T>
> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: AutocompletePrompt<T>) => void) {
    super('autocomplete', name, message)
    if (callback) callback(this)
  }

  /**
   * On render callback. Keyword this refers to the current prompt
   */
  onRender(onRender: TOnRender) {
    this.data['onRender'] = onRender
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
  clearFirst(clearFirst: boolean) {
    this.data['clearFirst'] = clearFirst
    return this
  }

  /**
   * Max number of results to show. Defaults to 10
   */
  limit(limit: number) {
    this.data['limit'] = limit
    return this
  }

  /**
   * Fallback message when no match is found. Defaults to initial value if provided
   */
  fallback(fallback: string) {
    this.data['fallback'] = fallback
    return this
  }

  /**
   * Hint to display to the user
   */
  hint(hint: string) {
    this.data['hint'] = hint
    return this
  }

  /**
   * Message to display when selecting a disabled option
   */
  warn(warn: string) {
    this.data['warn'] = warn
    return this
  }

  /**
   * An array of options/choices for the user to select.
   */
  choices(choices: Choice[]) {
    this.data['choices'] = choices
    return this
  }

  /**
   * Minimum number of choices to select - will display error.
   */
  min(min: number) {
    this.data['min'] = min
    return this
  }

  /**
   * Maximum number of choices to select
   */
  max(max: number) {
    this.data['max'] = max
    return this
  }

  /**
   * Filter function. Defaults to sort by title property. suggest should always return a promise. Filters using title by default
   */
  suggest(suggest: TSuggest<T>) {
    this.data['suggest'] = suggest
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
}

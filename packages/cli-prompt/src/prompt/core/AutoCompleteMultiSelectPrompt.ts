import { AbstractUserPrompt } from './AbstractUserPrompt'
import { Choice } from 'prompts'
import { IAutocompleteMultiSelectPrompt, TFormat, TOnRender } from './types'

/**
 * Interactive multiselect user prompts in the terminal.
 */
export class AutoCompleteMultiSelectPrompt<T extends string | number | boolean = number> extends AbstractUserPrompt<
  IAutocompleteMultiSelectPrompt<T>
> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: AutoCompleteMultiSelectPrompt<T>) => void) {
    super('autocompleteMultiselect', name, message)
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
   * Prompt instructions to display
   */
  instructions(instructions: string) {
    this.data['instructions'] = instructions
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
   * Number of options displayed per page.
   */
  optionsPerPage(optionsPerPage = 10) {
    this.data['optionsPerPage'] = optionsPerPage
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
   * Receive user input. The returned value will be added to the response object
   */
  format(format: TFormat<T>) {
    this.data['format'] = format
    return this
  }
}

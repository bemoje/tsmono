import { AbstractUserPrompt } from './AbstractUserPrompt'
import { Choice } from 'prompts'
import { ISelectPrompt, TFormat, TOnRender } from './types'

/**
 * Interactive select user prompts in the terminal.
 */
export class SelectPrompt<T extends number = number> extends AbstractUserPrompt<ISelectPrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: SelectPrompt<T>) => void) {
    super('select', name, message)
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
   * Receive user input. The returned value will be added to the response object
   */
  format(format: TFormat<T>) {
    this.data['format'] = format
    return this
  }
}

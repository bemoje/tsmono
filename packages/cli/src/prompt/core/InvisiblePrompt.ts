import { AbstractUserPrompt } from './AbstractUserPrompt'
import { IInvisiblePrompt, TFormat, TOnRender, TValidate } from './types'
/**
 * Interactive invisible user prompts in the terminal.
 */
export class InvisiblePrompt<T extends string = string> extends AbstractUserPrompt<IInvisiblePrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: InvisiblePrompt<T>) => void) {
    super('invisible', name, message)
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
   * Receive user input. The returned value will be added to the response object
   */
  format(format: TFormat<T>) {
    this.data['format'] = format
    return this
  }

  /**
   * Receive user input. Should return true if the value is valid, and an error message String otherwise.
   * If false is returned, a default error message is shown
   */
  validate(validate: TValidate<T>) {
    this.data['validate'] = validate
    return this
  }
}

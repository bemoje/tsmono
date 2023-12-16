import { AbstractUserPrompt } from './AbstractUserPrompt'
import { ITextPrompt, TOnRender, TStyle, TValidate } from './types'
/**
 * Interactive text user prompts in the terminal.
 */
export class TextPrompt<T extends string = string> extends AbstractUserPrompt<ITextPrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: TextPrompt<T>) => void) {
    super('text', name, message)
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
   * Receive user input. Should return true if the value is valid, and an error message String otherwise.
   * If false is returned, a default error message is shown
   */
  validate(validate: TValidate<T>) {
    this.data['validate'] = validate
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

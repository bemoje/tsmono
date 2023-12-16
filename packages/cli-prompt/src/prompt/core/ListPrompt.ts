import { AbstractUserPrompt } from './AbstractUserPrompt'
import { IListPrompt, TOnRender, TStyle, TValidate } from './types'

/**
 * Interactive list user prompts in the terminal.
 */
export class ListPrompt<T extends string = string> extends AbstractUserPrompt<IListPrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: ListPrompt<T>) => void) {
    super('list', name, message)
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
   * String separator. Will trim all white-spaces from start and end of string. Defaults to ','
   */
  separator(separator: string) {
    this.data['separator'] = separator
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

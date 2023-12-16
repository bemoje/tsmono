import { AbstractUserPrompt } from './AbstractUserPrompt'
import { IConfirmPrompt, TOnRender } from './types'

/**
 * Interactive confirm user prompts in the terminal.
 */
export class ConfirmPrompt<T extends boolean = boolean> extends AbstractUserPrompt<IConfirmPrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: ConfirmPrompt<T>) => void) {
    super('confirm', name, message)
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
}

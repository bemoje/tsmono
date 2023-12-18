import { AbstractUserPrompt } from './AbstractUserPrompt'
import { Any } from '@bemoje/util'
import { IDatePrompt, TOnRender, TValidate } from './types'
import { LocalesMonths, LocalesWeeks } from '@bemoje/util'

/**
 * Interactive date user prompts in the terminal.
 */
export class DatePrompt<T extends Date = Date> extends AbstractUserPrompt<IDatePrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: DatePrompt<T>) => void) {
    super('date', name, message)
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
   * Use to define custom locales. See below for an example.
   * More info: https://github.com/terkelg/prompts/wiki/Date-Time-Formatting
   */
  locales(locales: LocalesMonths & LocalesWeeks) {
    this.data['locales'] = locales as Any
    return this
  }

  /**
   * The format mask of the date. See below for more information.
   * More info: https://github.com/terkelg/prompts/wiki/Date-Time-Formatting
   */
  mask(mask = 'YYYY-MM-DD HH:mm:ss') {
    this.data['mask'] = mask
    return this
  }
}

import { AbstractUserPrompt } from './AbstractUserPrompt'
import { ITogglePrompt, TActive, TInactive, TOnRender } from './types'

/**
 * Interactive toggle user prompts in the terminal.
 */
export class TogglePrompt<T extends boolean = boolean> extends AbstractUserPrompt<ITogglePrompt<T>> {
  /**
   * @param type - The type of prompt
   * @param message - The message to display to the user
   */
  constructor(name: string, message: string, callback?: (self: TogglePrompt<T>) => void) {
    super('toggle', name, message)
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
   * Text for active state. Defaults to 'on'
   */
  active(active: TActive = 'on') {
    this.data['active'] = active
    return this
  }

  /**
   * Text for inactive state. Defaults to 'off'
   */
  inactive(inactive: TInactive = 'off') {
    this.data['inactive'] = inactive
    return this
  }
}

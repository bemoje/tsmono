import { LocalesMonths, LocalesWeeks } from '@bemoje/util'
import { Choice, PromptType } from 'prompts'

/**
 * MOre typing details if in doubt: packages\b\node_modules\prompts\lib\elements\autocomplete.js
 */

/**
 *
 */
export interface IPromptObjectRequired {
  type: PromptType
  name: string
  message: string
}

/**
 * Text prompt
 * @param {string} message Prompt message to display
 * @param {string} [initial] Default string value
 * @param {string} [style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [onState] On state change callback
 * @param {function} [validate] Function to validate user input
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface ITextPromptObject<T extends string = string> extends IPromptObjectRequired {
  type: 'text'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: T
  style?: 'default' | 'password' | 'invisible' | 'emoji'
  format?: format<T>
}

/**
 * Password prompt with masked input
 * @param {string} message Prompt message to display
 * @param {string} [initial] Default string value
 * @param {function} [onState] On state change callback
 * @param {function} [validate] Function to validate user input
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface IPasswordPromptObject<T extends string = string> extends IPromptObjectRequired {
  type: 'password'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: T
  format?: format<T>
}

/**
 * Prompt where input is invisible, like sudo
 * @param {string} message Prompt message to display
 * @param {string} [initial] Default string value
 * @param {function} [onState] On state change callback
 * @param {function} [validate] Function to validate user input
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface IInvisiblePromptObject<T extends string = string> extends IPromptObjectRequired {
  type: 'invisible'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: T
  format?: format<T>
}

/**
 * Number prompt
 * @param {string} message Prompt message to display
 * @param {number} initial Default number value
 * @param {function} [onState] On state change callback
 * @param {number} [max] Max value
 * @param {number} [min] Min value
 * @param {string} [style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [validate] Function to validate user input
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface INumberPromptObject extends IPromptObjectRequired {
  type: 'number'
  name: string
  message: string

  validate?: validate<number>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: number
  format?: format<number>
  min?: number
  max?: number
  float?: boolean
  round?: number
  increment?: number
  style?: 'default' | 'password' | 'invisible' | 'emoji'
}

/**
 * Classic yes/no prompt
 * @param {string} message Prompt message to display
 * @param {boolean} [initial=false] Default value
 * @param {function} [onState] On state change callback
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface IConfirmPromptObject<T extends boolean = boolean> extends IPromptObjectRequired {
  type: 'confirm'
  name: string

  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: T
  format?: format<T>
}

/**
 * List prompt, split intput string by `seperator`
 * @param {string} message Prompt message to display
 * @param {string} [initial] Default string value
 * @param {string} [style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [separator] String separator
 * @param {function} [onState] On state change callback
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface IListPromptObject<T extends string = string> extends IPromptObjectRequired {
  type: 'list'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  style?: 'default' | 'password' | 'invisible' | 'emoji'
  format?: format<T>
  initial?: T
  separator?: string
}

/**
 * Toggle/switch prompt
 * @param {string} message Prompt message to display
 * @param {boolean} [initial=false] Default value
 * @param {string} [active="on"] Text for `active` state
 * @param {string} [inactive="off"] Text for `inactive` state
 * @param {function} [onState] On state change callback
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface ITogglePromptObject<T extends boolean = boolean> extends IPromptObjectRequired {
  type: 'toggle'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: T
  format?: format<T>
  active?: active
  inactive?: inactive
}

/**
 * Interactive select prompt
 * @param {string} message Prompt message to display
 * @param {Array} choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [initial] Index of default value
 * @param {String} [hint] Hint to display
 * @param {function} [onState] On state change callback
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface ISelectPromptObject<T extends number = number> extends IPromptObjectRequired {
  type: 'select'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: T
  format?: format<T>
  hint?: string
  warn?: string
  choices?: Choice[]
}

/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} message Prompt message to display
 * @param {Array} choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [max] Max select
 * @param {string} [hint] Hint to display user
 * @param {Number} [cursor=0] Cursor start position
 * @param {function} [onState] On state change callback
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface IMultiSelectPromptObject<T extends string | number | boolean = number> extends IPromptObjectRequired {
  type: 'multiselect'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  format?: format<T>
  instructions?: string
  choices?: Choice[]
  optionsPerPage?: number
  min?: number
  max?: number
  hint?: string
  warn?: string
}

/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} message Prompt message to display
 * @param {Array} choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [max] Max select
 * @param {string} [hint] Hint to display user
 * @param {Number} [cursor=0] Cursor start position
 * @param {function} [onState] On state change callback
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface IAutocompleteMultiSelectPromptObject<T extends string | number | boolean = number>
  extends IPromptObjectRequired {
  type: 'autocompleteMultiselect'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  format?: format<T>
  instructions?: string
  choices?: Choice[]
  optionsPerPage?: number
  min?: number
  max?: number
  hint?: string
  warn?: string
}

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 * @param {Boolean} [opts.clearFirst] The first ESCAPE keypress will clear the input
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.noMatches] The no matches found label
 */
export interface IAutocompletePromptObject<T extends string | number | boolean = string> extends IPromptObjectRequired {
  type: 'autocomplete'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  format?: format<T>
  choices?: Choice[]
  suggest?: suggest<T>
  limit?: number
  style?: 'default' | 'password' | 'invisible' | 'emoji'
  initial?: T
  clearFirst?: boolean
  fallback?: string
}

/**
 * Date prompt
 * @param {string} message Prompt message to display
 * @param {number} initial Default number value
 * @param {function} [onState] On state change callback
 * @param {number} [max] Max value
 * @param {number} [min] Min value
 * @param {string} [style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [validate] Function to validate user input
 * @param {Stream} [stdin] The Readable stream to listen to
 * @param {Stream} [stdout] The Writable stream to write readline data to
 */
export interface IDatePromptObject<T extends Date = Date> extends IPromptObjectRequired {
  type: 'date'
  name: string
  message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  initial?: T
  locales?: LocalesMonths & LocalesWeeks
  mask?: string
}

/**
 * Receive the user input and return the formatted value to be used inside the program. The value returned will be added to the response object.
 * The function signature is (val, values), where val is the value from the current prompt and values is the current response object in case you need to format based on previous responses.
 */
export type format<T> = (val: string, values: Record<string, T>) => T

/**
 * Receive user input. Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown
 */
export type validate<T> = (value: T) => boolean | string

/**
 * state is an object with a snapshot of the current state. The state object has two properties value and aborted. E.g { value: 'This is ', aborted: false }
 */
export type StateObject = { value: string; aborted: boolean }

/**
 * Callback for when the state of the current prompt changes. The function signature is (state)
 * @see StateObject
 */
export type onState = (state: StateObject) => void

/**
 * Callback for when the prompt is rendered. The function receives kleur as its first argument and this refers to the current prompt.
 */
export type onRender = (kleur: unknown) => void

/**
 * Text for active state. Defaults to 'on'
 */
export type active = 'on' | 'off' | 'yes' | 'no'

/**
 * Text for inactive state. Defaults to 'off'
 */
export type inactive = 'on' | 'off' | 'yes' | 'no'

/**
 * Filter function. Defaults to sort by title property. suggest should always return a promise. Filters using title by default
 */
export type suggest<T> = (input: T, choices: Choice[]) => Promise<Choice[]>

/**
 * By default, prompts uses process.stdin for receiving input and process.stdout for writing output. If you need to use different streams, for instance process.stderr, you can set these with the stdin and stdout properties.
 */
export type stdout = WritableStream | typeof process.stdout

/**
 * By default, prompts uses process.stdin for receiving input and process.stdout for writing output. If you need to use different streams, for instance process.stderr, you can set these with the stdin and stdout properties.
 */
export type stdin = ReadableStream | typeof process.stdin

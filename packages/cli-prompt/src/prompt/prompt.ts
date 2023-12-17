import { AutoCompleteMultiSelectPrompt } from './core/AutoCompleteMultiSelectPrompt'
import { AutocompletePrompt } from './core/AutocompletePrompt'
import { ConfirmPrompt } from './core/ConfirmPrompt'
import { DatePrompt } from './core/DatePrompt'
import { InvisiblePrompt } from './core/InvisiblePrompt'
import { ListPrompt } from './core/ListPrompt'
import { MultiSelectPrompt } from './core/MultiSelectPrompt'
import { NumberPrompt } from './core/NumberPrompt'
import { PasswordPrompt } from './core/PasswordPrompt'
import { SearchPrompt } from './core/SearchPrompt'
import { SelectPrompt } from './core/SelectPrompt'
import { TextPrompt } from './core/TextPrompt'
import { TogglePrompt } from './core/TogglePrompt'

/**
 * User prompt module
 *
 * @example ```ts
 * await prompt
 *   .text('user', 'What is your  username?') //
 *   .run()
 *
 * await prompt
 *   .password('pass', 'Enter password') //
 *   .run()
 *
 * await prompt
 *   .number('age', 'How old are you?')
 *   .validate((value) => (value < 18 ? `Nightclub is 18+ only` : true))
 *   .run()
 *
 * await prompt
 *   .confirm('confirm', 'Can you confirm this is your age?') //
 *   .initial(true)
 *   .run()
 *
 * await prompt
 *   .list('kws', 'Enter some keywords')
 *   .separator(' ')
 *   .validate((arr) => (arr.length > 1 ? true : 'Please enter more than one'))
 *   .run()
 *
 * await prompt
 *   .toggle('cool', 'Toggle Cool Mode') //
 *   .initial(true)
 *   .active('on')
 *   .inactive('off')
 *   .run()
 *
 * await prompt
 *   .select('col1', 'Pick a color')
 *   .choices([
 *     { title: 'Red', description: 'This option has a description', value: '#ff0000' },
 *     { title: 'Green', value: '#00ff00', disabled: true },
 *     { title: 'Blue', value: '#0000ff' },
 *   ])
 *   .initial(0)
 *   .hint('Select your favorite.')
 *   .warn('Really not a good idea,')
 *   .run()
 *
 * await prompt
 *   .multiselect('col2', 'Pick between 1 and 3 colors')
 *   .choices([
 *     { title: 'Black', value: '#000000', disabled: false, selected: false },
 *     { title: 'Red', value: '#ff0000', disabled: false, selected: false },
 *     { title: 'Green', value: '#00ff00', disabled: true, selected: false },
 *     { title: 'Blue', value: '#0000ff', disabled: false, selected: false },
 *     { title: 'White', value: '#ffffff', disabled: false, selected: true },
 *   ])
 *   .instructions('Here are some instructions')
 *   .min(1)
 *   .max(3)
 *   .hint('Select your favorite.')
 *   .warn('Really not a good idea,')
 *   .run()
 *
 * await prompt
 *   .autocompleteMultiSelect('col3', 'Pick between 1 and 3 colors')
 *   .choices([
 *     { title: 'Black', value: '#000000', disabled: false, selected: false },
 *     { title: 'Red', value: '#ff0000', disabled: false, selected: false },
 *     { title: 'Green', value: '#00ff00', disabled: true, selected: false },
 *     { title: 'Blue', value: '#0000ff', disabled: false, selected: false },
 *     { title: 'White', value: '#ffffff', disabled: false, selected: true },
 *   ])
 *   .instructions('Here are some instructions')
 *   .min(1)
 *   .max(3)
 *   .hint('Select your favorite.')
 *   .warn('Really not a good idea,')
 *   .run()
 *
 * await prompt
 *   .date('future', 'Select a date in the future')
 *   .initial(new Date())
 *   .validate((date) => (date > new Date() ? true : 'Date must be in the future'))
 *   .run()
 *
 * await prompt
 *   .invisible('invisible', 'This is invisible') //
 *   .initial('secret')
 *   .run()
 *
 * await prompt
 *   .autocomplete('actor', 'Pick your favorite actor')
 *   .choices([
 *     { title: 'Cage' },
 *     { title: 'Clooney', value: 'silver-fox' },
 *     { title: 'Gyllenhaal' },
 *     { title: 'Gibson' },
 *     { title: 'Grant' },
 *   ])
 *   .run()
 *
 * await prompt
 *   .search('test')
 *   .choices(fs.readFileSync(__filename, 'utf8').split(/[\s\n\r]/))
 *   .filtering({ includes: true, startsWith: true })
 *   .clearFirst(true)
 *   .limit(30)
 *   .separator(' ')
 *   .run()
 * ```
 */
export const prompt = {
  text: (name: string, message: string, callback?: (self: TextPrompt) => void) => {
    return new TextPrompt(name, message, callback)
  },
  number: (name: string, message: string, callback?: (self: NumberPrompt) => void) => {
    return new NumberPrompt(name, message, callback)
  },
  confirm: (name: string, message: string, callback?: (self: ConfirmPrompt) => void) => {
    return new ConfirmPrompt(name, message, callback)
  },
  password: (name: string, message: string, callback?: (self: PasswordPrompt) => void) => {
    return new PasswordPrompt(name, message, callback)
  },
  invisible: (name: string, message: string, callback?: (self: InvisiblePrompt) => void) => {
    return new InvisiblePrompt(name, message, callback)
  },
  list: (name: string, message: string, callback?: (self: ListPrompt) => void) => {
    return new ListPrompt(name, message, callback)
  },
  toggle: (name: string, message: string, callback?: (self: TogglePrompt) => void) => {
    return new TogglePrompt(name, message, callback)
  },
  select: (name: string, message: string, callback?: (self: SelectPrompt) => void) => {
    return new SelectPrompt(name, message, callback)
  },
  multiselect: (name: string, message: string, callback?: (self: MultiSelectPrompt) => void) => {
    return new MultiSelectPrompt(name, message, callback)
  },
  autocomplete: (name: string, message: string, callback?: (self: AutocompletePrompt) => void) => {
    return new AutocompletePrompt(name, message, callback)
  },
  autocompleteMultiSelect: (
    name: string,
    message: string,
    callback?: (self: AutoCompleteMultiSelectPrompt) => void
  ) => {
    return new AutoCompleteMultiSelectPrompt(name, message, callback)
  },
  date: (name: string, message: string, callback?: (self: DatePrompt) => void) => {
    return new DatePrompt(name, message, callback)
  },
  search: (name: string, callback?: (self: SearchPrompt) => void) => {
    return new SearchPrompt(name, callback)
  },
}

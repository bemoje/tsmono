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

export default prompt

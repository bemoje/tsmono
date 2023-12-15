import fs from 'fs'
import { prompt } from './prompt'

async function example() {
  // TextPrompt
  await prompt
    .text('user', 'What is your  username?') //
    .run()

  // PasswordPrompt
  await prompt
    .password('pass', 'Enter password') //
    .run()

  // NumberPrompt
  await prompt
    .number('age', 'How old are you?')
    .validate((value) => (value < 18 ? `Nightclub is 18+ only` : true))
    .run()

  // ConfirmPrompt
  await prompt
    .confirm('confirm', 'Can you confirm this is your age?') //
    .initial(true)
    .run()

  // ListPrompt
  await prompt
    .list('kws', 'Enter some keywords')
    .separator(' ')
    .validate((arr) => (arr.length > 1 ? true : 'Please enter more than one'))
    .run()

  // TogglePrompt
  await prompt
    .toggle('cool', 'Toggle Cool Mode') //
    .initial(true)
    .active('on')
    .inactive('off')
    .run()

  // SelectPrompt
  await prompt
    .select('col1', 'Pick a color')
    .choices([
      { title: 'Red', description: 'This option has a description', value: '#ff0000' },
      { title: 'Green', value: '#00ff00', disabled: true },
      { title: 'Blue', value: '#0000ff' },
    ])
    .initial(0)
    .hint('Select your favorite.')
    .warn('Really not a good idea,')
    .run()

  // MultiSelectPrompt
  await prompt
    .multiselect('col2', 'Pick between 1 and 3 colors')
    .choices([
      { title: 'Black', value: '#000000', disabled: false, selected: false },
      { title: 'Red', value: '#ff0000', disabled: false, selected: false },
      { title: 'Green', value: '#00ff00', disabled: true, selected: false },
      { title: 'Blue', value: '#0000ff', disabled: false, selected: false },
      { title: 'White', value: '#ffffff', disabled: false, selected: true },
    ])
    .instructions('Here are some instructions')
    .min(1)
    .max(3)
    .hint('Select your favorite.')
    .warn('Really not a good idea,')
    .run()

  // AutoCompleteMultiSelectPrompt
  await prompt
    .autocompleteMultiSelect('col3', 'Pick between 1 and 3 colors')
    .choices([
      { title: 'Black', value: '#000000', disabled: false, selected: false },
      { title: 'Red', value: '#ff0000', disabled: false, selected: false },
      { title: 'Green', value: '#00ff00', disabled: true, selected: false },
      { title: 'Blue', value: '#0000ff', disabled: false, selected: false },
      { title: 'White', value: '#ffffff', disabled: false, selected: true },
    ])
    .instructions('Here are some instructions')
    .min(1)
    .max(3)
    .hint('Select your favorite.')
    .warn('Really not a good idea,')
    .run()

  // DatePrompt
  await prompt
    .date('future', 'Select a date in the future')
    .initial(new Date())
    .validate((date) => (date > new Date() ? true : 'Date must be in the future'))
    .run()

  // InvisiblePrompt
  await prompt
    .invisible('invisible', 'This is invisible') //
    .initial('secret')
    .run()

  // AutocompletePrompt
  await prompt
    .autocomplete('actor', 'Pick your favorite actor')
    .choices([
      { title: 'Cage' },
      { title: 'Clooney', value: 'silver-fox' },
      { title: 'Gyllenhaal' },
      { title: 'Gibson' },
      { title: 'Grant' },
    ])
    .run()

  // SearchPrompt
  await prompt
    .search('test')
    .choices(fs.readFileSync(__filename, 'utf8').split(/[\s\n\r]/))
    .filtering({ includes: true, startsWith: true })
    .clearFirst(true)
    .limit(30)
    .separator(' ')
    .run()
}
// example().catch(console.error)

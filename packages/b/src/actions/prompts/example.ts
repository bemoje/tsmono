import { CLI_LIST } from './list'
import { commandSearchPrompt } from './commandSearchPrompt/commandSearchPrompt'
import { execInherit } from '@bemoje/util'

commandSearchPrompt(CLI_LIST, {
  defaultValue: 'b',
  maxResults: 15,
  filtering: {
    startsWith: true,
    includes: true,
  },
})
  .then((res) => {
    console.log(res)
    execInherit([res.selected, res.args].join(' ')) //
      .then(console.log)
      .catch(console.error)
    //
  })
  .catch(console.error)

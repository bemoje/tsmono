import { execInherit } from '@bemoje/util'
import { CLI_LIST } from '../../cli/list'
import { commandSearchPrompt } from './commandSearchPrompt/commandSearchPrompt'

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

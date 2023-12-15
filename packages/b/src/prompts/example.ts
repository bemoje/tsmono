import { CLI_LIST } from './list'
import { commandSearchPrompt } from './commandSearchPrompt/commandSearchPrompt'
import { execInherit } from '@bemoje/util'
import { searchPrompt } from './searchPrompt/searchPrompt'

/**
 *
 */
function commandSearchPromptExample() {
  commandSearchPrompt(CLI_LIST, {
    initial: 'b',
    limit: 15,
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
}

// commandSearchPromptExample()

/**
 *
 */
function searchPromptExample() {
  searchPrompt(CLI_LIST, {}).then(console.log)
}

// searchPromptExample()

//

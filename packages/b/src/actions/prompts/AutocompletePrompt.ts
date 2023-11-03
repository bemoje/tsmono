import { arrEvery, colors } from '@bemoje/util'
import prompts, { Choice, PromptObject } from 'prompts'
import { CLI_LIST } from '../../cli/list'
import { IAutocompletePromptObject } from '../../core/PromptBuilder'

/**
 * Interactive list search filtering of a flattened tree structure.
 * The intended use case is CLI-based navigation and searching a long
 * list of many and also deeply nested CLI commands.
 *
 * @remarks
 * Returns
 * 1 100% matches always from beginning of searched strings/words
 * 2 100% matches anywhere in the searched strings/words
 *
 * If the first category can be narrowed down to exactly one result,
 * then it is immediately returned and the other category discarded.
 */
export async function interactiveCommandSearch(
  data: string[] = CLI_LIST
): Promise<{ result: string[]; selected: Record<string, string> }> {
  // current user input split to array of keywords
  let kws: string[] = []

  // last non-empty search result
  let searchResults: Choice[] = []

  // utility type
  type ExpandedChoice = Choice & { arr: string[]; dim: string; last: string }

  /**
   * Fitler/suggest/search based on user input
   */
  function search(input: string, choices: Choice[]) {
    kws = userInputToKeywords(input)
    const results: Choice[] = []
    const temp: Choice[] = []

    // 100% match always from beginning of searched strings/words
    choices.forEach((choice) => {
      const has = someCmdStartsWithEveryKw(kws, choice)
      if (has) {
        results.push(choice)
      } else {
        temp.push(choice)
      }
    })

    if (results.length === 1) {
      searchResults = results
      return Promise.resolve(results)
    }

    // 100% match anywhere in the searched strings/words
    temp.forEach((choice) => {
      if (everyKwInCmd(kws, choice)) {
        results.push(choice)
      }
    })

    if (!results.length) {
      return Promise.resolve([])
    }

    searchResults = results
    return Promise.resolve(results)

    ///////////////////////
    // Filtering helpers
    ///////////////////////

    function userInputToKeywords(input: string): string[] {
      return input
        .trim()
        .split(' ')
        .filter((i) => !!i)
    }

    function someCmdStartsWithEveryKw(kws: string[], choice: Choice) {
      return arrEvery(kws, (kw: string) => {
        return (choice as ExpandedChoice).arr.some((c: string) => c.startsWith(kw))
      })
    }

    function everyKwInCmd(kws: string[], choice: Choice) {
      return arrEvery(kws, (kw: string) => {
        return (choice as ExpandedChoice).value.includes(kw)
      })
    }
  }

  /**
   * Color the matched keywords in the search results.
   * These are ANSI colors for while the user is navigating.
   * The returned user selected data has no coloring.
   */
  function paintJob(choice: ExpandedChoice, kws: string[]) {
    let last = choice.last
    if (!last) return ''
    for (const kw of kws) {
      if (last.startsWith(kw)) {
        last = last?.replace(kw, colors.magenta(kw))
      } else if (last.includes(kw)) {
        last = last?.replace(kw, colors.green(kw))
      }
    }
    return choice.dim + last
  }

  /**
   * Initialize the list of commands to search through
   */
  const CLIs: Choice[] = data.map((cmdpath: string) => {
    const value = cmdpath
    const arr = value.trim().split(' ')
    const last = arr.pop()
    const join = arr.join(' ').trim()
    arr.push(last as string)
    const dim = join && last ? colors.dim(join) + ' ' : ''
    const o = {
      title: value,
      value: value,
      description: '',
      arr: arr,
      dim: dim,
      last,
    }
    return o
  })

  /**
   * The autocomplete prompt options
   */
  const opts: IAutocompletePromptObject = {
    type: 'autocomplete',
    name: 'b',
    message: '0',
    limit: 25,
    clearFirst: true,
    initial: 'b',
    choices: CLIs,

    onRender: function () {
      this.choices?.forEach((choice) => {
        const _choice = choice as ExpandedChoice
        _choice.title = paintJob(_choice, kws)
      })
      Reflect.set(this, 'msg', String(searchResults.length))
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    suggest: search as (input: string, choices: Choice[]) => Promise<any>,
  }

  const selected = await prompts(opts as PromptObject)
  const result = searchResults.map((choice) => choice.value)
  return { result, selected }
}

interactiveCommandSearch().then(console.log).catch(console.log)

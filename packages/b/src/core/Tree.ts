import { arrEvery } from '@bemoje/util'
import kleur from 'kleur'
import prompts, { Choice, PromptObject } from 'prompts'
import { IAutocompletePromptObject } from './PromptBuilder'

prompts

/**
 *
 */
export class CommandTree {
  root: CommandNode
  constructor() {
    this.root = new CommandNode()
  }
}

/**
 *
 */
export class CommandNode {
  constructor() {
    //
  }
}

const resetPaintJob = (choice: ChoiceFullObj, kws: string[]) => {
  if (choice === spacer) return choice.title
  let last = choice.last
  if (!last) return ''
  for (const kw of kws) {
    if (last.startsWith(kw)) {
      last = last?.replace(kw, kleur.magenta(kw))
    } else if (last.includes(kw)) {
      last = last?.replace(kw, kleur.green(kw))
    }
  }
  return choice.dim + last
}

const data = [
  //
  'b',
  'b repo',
  'b git',
  'b gpt',
  'b find',

  'b find search',
  'b find index',
  //
  'b git commit',
  'b git push',
  'b git checkout',
  'b git branch',

  //
  'b github repo create',
  'b github repo delete',
  'b github repo rename',
  //
  'b git branch list',
  'b git branch create',
  'b git branch delete',
  'b git branch rename',
  'b git branch move',
  'b git branch merge',
  //
  'b generate UUID',
].sort()
// .map(resetPaintJob)

type ChoiceFullObj = Choice & { arr: string[]; dim: string; last: string }

const choices: Choice[] = data.map((cmdpath: string) => {
  const value = cmdpath.substring(2)
  const arr = value.trim().split(' ')
  const last = arr.pop()
  const join = arr.join(' ').trim()
  arr.push(last as string)
  const dim = join && last ? kleur.dim(join) + ' ' : ''
  const o = {
    title: value,
    value: value,
    description: '',
    arr: arr,
    dim: dim,
    last,
  }
  console.log(o)
  return o
})

const spacer = { title: '---------------------------' }
type ChoiceAndArr = Choice & { arr: string[] }
let len = 0
let kws: string[] = []

function someCmdStartsWithEveryKw(kws: string[], choice: Choice) {
  return arrEvery(kws, (kw: string) => {
    return (choice as ChoiceAndArr).arr.some((c: string) => c.startsWith(kw))
  })
}
function everyKwInCmd(kws: string[], choice: Choice) {
  return arrEvery(kws, (kw: string) => {
    return (choice as ChoiceAndArr).value.includes(kw)
  })
}

const suggestByTitle = (input: string, choices: Choice[]) => {
  kws = input
    .trim()
    .split(' ')
    .filter((i) => !!i)

  const result: Choice[] = []
  const remaining: Choice[] = []
  choices.forEach((choice) => {
    const has = someCmdStartsWithEveryKw(kws, choice)
    if (has) {
      result.push(choice)
    } else {
      remaining.push(choice)
    }
  })

  if (result.length === 1) return result

  result.push(spacer)

  remaining.forEach((choice) => {
    if (everyKwInCmd(kws, choice)) {
      result.push(choice)
    }
  })

  len = result.length
  return Promise.resolve(result)
}

const o: IAutocompletePromptObject = {
  type: 'autocomplete',
  name: 'b',
  message: '0',
  choices,
  suggest: suggestByTitle as (input: string, choices: Choice[]) => Promise<any>,

  // validate: validate<T>
  onRender: function () {
    this.choices?.forEach((choice) => {
      const _choice = choice as ChoiceFullObj
      _choice.title = resetPaintJob(_choice, kws)
    })
    // const numResults = arrSum(this.choices?.map((i) => (i.disabled ? 0 : 1)) as number[])
    Reflect.set(this, 'msg', String(len))
  },
  // onState: (state: any) => console.log(state),
  // stdin: stdin
  // stdout: stdout

  // format: (input: string) => {
  //   return input
  // },
  // choices: Choice[]
  limit: 50,
  // style: 'default' | 'password' | 'invisible' | 'emoji'
  // initial: T
  clearFirst: true,
  // fallback: 'string'
}

prompts(o as PromptObject)
  .then(console.log)
  .catch(console.log)

import { strToSetterMethodName } from '@bemoje/util'
import prompts, { PromptObject, PromptType } from 'prompts'
import { BArgument } from './BArgument'
import { BCommand } from './BCommand'
import {
  INumberPromptObject,
  IPromptObjectRequired,
  ITextPromptObject,
  format,
  onRender,
  onState,
  stdin,
  stdout,
  validate,
} from './PromptBuilder'
import { ValidInputPrimitiveTypes } from './ValidInputPrimitiveTypes'

export class TextArgument extends BArgument<string> {
  constructor(name: string, description?: string) {
    super(name, description)
  }

  createPromptObject(cmd: BCommand): TextPromptObject {
    return new TextPromptObject(this)
  }

  // createPromptObject(cmd: BCommand): ITextPromptObject<string> {
  //   // eslint-disable-next-line @typescript-eslint/no-this-alias

  //   const name = this.name()

  //   const message =
  //     this.description +
  //     (this.defaultValue
  //       ? ' (default: ' +
  //         this.defaultValue +
  //         (this.defaultValueDescription ? ' :: ' + this.defaultValueDescription : '') +
  //         ')'
  //       : '') +
  //     ' ' +
  //     (this.variadic ? ' (variadic)' : '') +
  //     ' ' +
  //     ('- Space to select. Return to submit.' + (this.variadic ? ' Type to filter.' : ''))

  //   let choices: { title: string }[] | undefined = undefined
  //   if (this.argChoices && this.argChoices.length) {
  //     choices = this.argChoices.map((choice) => ({ title: choice }))
  //   } else if (name === 'cmd' && !choices) {
  //     choices = cmd.commands.map((cmd) => {
  //       return { title: cmd.name() }
  //     })
  //   }

  //   // const onSubmit = (prompt: PromptObject, answer: string) => console.log(`Thanks I got ${answer} from ${prompt.name}`)
  // }
}

export class NumberArgument extends BArgument<number> {
  min?: number
  max?: number
  float?: boolean
  round?: number

  constructor(name: string, description?: string) {
    super(name, description)
  }

  createPromptObject(cmd: BCommand): NumberPromptObject {
    return new NumberPromptObject(this)
  }
}

export abstract class AbstractPromptObject<T extends ValidInputPrimitiveTypes> implements IPromptObjectRequired {
  abstract type: PromptType
  abstract name: string
  abstract message: string

  validate?: validate<T>
  onRender?: onRender
  onState?: onState
  stdin?: stdin
  stdout?: stdout

  abstract getParent(): BArgument<T>

  setMessage(value: string): this {
    this.message = value
    return this
  }
  setValidate(value: validate<T>): this {
    this.validate = value
    return this
  }
  setOnRender(value: onRender): this {
    this.onRender = value
    return this
  }
  setOnState(value: onState): this {
    this.onState = value
    return this
  }
  setStdin(value: stdin): this {
    this.stdin = value
    return this
  }
  setStdout(value: stdout): this {
    this.stdout = value
    return this
  }

  /**
   * Assign properties to this object, but none that are unknown to the instances prototype.
   */
  assign<I extends IPromptObjectRequired>(o: I): this {
    for (const [key, value] of Object.entries(o)) {
      if (value == null) continue
      const setterName = strToSetterMethodName(key)
      if (!(setterName in this)) continue
      const setter = Reflect.get(this, setterName) as any
      setter.call(this, value)
    }
    return this
  }

  createValidator(parent: BArgument<T>) {
    this.validate = function isValid(value: T): boolean | string {
      for (const validator of parent.validators) {
        const result = validator(value)
        if (result !== true) return result
      }
      return true
    }
  }
}

export class TextPromptObject extends AbstractPromptObject<string> implements ITextPromptObject<string> {
  #parent: TextArgument
  readonly type = 'text' as const
  name: string
  message: string

  initial?: string
  style?: 'default' | 'password' | 'invisible' | 'emoji'
  format?: format<string>

  constructor(parent: TextArgument, props?: ITextPromptObject<string>) {
    super()
    this.#parent = parent
    if (props) this.assign(props)

    this.name = parent.name()
    this.message = parent.description

    this.createValidator(parent)
    if (parent.defaultValue) this.initial = parent.defaultValue
  }

  getParent(): TextArgument {
    return this.#parent
  }
  setInitial(value: string) {
    this.initial = value
  }
  setFormat(value: format<string>) {
    this.format = value
  }
  setStyle(value: 'default' | 'password' | 'invisible' | 'emoji') {
    this.style = value
  }
}

class NumberPromptObject extends AbstractPromptObject<number> implements INumberPromptObject {
  #parent: NumberArgument
  readonly type = 'number' as const
  name: string
  message: string

  initial?: number
  format?: format<number>
  min?: number
  max?: number
  float?: boolean
  round?: number
  increment?: number
  style?: 'default' | 'password' | 'invisible' | 'emoji'

  constructor(parent: NumberArgument, props?: INumberPromptObject) {
    super()
    this.#parent = parent
    if (props) this.assign(props)
    this.name = parent.name()
    this.message = parent.description
  }

  getParent(): NumberArgument {
    return this.#parent
  }

  setInitial(value: number) {
    this.initial = value
  }
  setFormat(value: format<number>) {
    this.format = value
  }
  setMin(value: number) {
    this.min = value
  }
  setMax(value: number) {
    this.max = value
  }
  setFloat(value: boolean) {
    this.float = value
  }
  setRound(value: number) {
    this.round = value
  }
  setIncrement(value: number) {
    this.increment = value
  }
  setStyle(value: 'default' | 'password' | 'invisible' | 'emoji') {
    this.style = value
  }
  done(): Readonly<this> {
    Object.freeze(this)
    return this
  }
}

function isAdultAge(age: number): boolean {
  return age > 18
}
function isSrcDir(files: string): boolean {
  return files === 'src'
}

async function main() {
  const cmd = new BCommand('b git commit')

  const a = new TextArgument('add', 'files to add to staged')
  a.choices(['src', 'test', 'package.json', '.'])
  a.addValidator(isSrcDir)
  cmd.addArgument(a)

  const age = new NumberArgument('age', 'your age')
  age.choices(['10', '20', '30'])
  age.argParser((value) => Number(value) * 2241)
  age.addValidator(isAdultAge)
  cmd.addArgument(age)

  const promptObjects = [a.createPromptObject(cmd), age.createPromptObject(cmd)]
  console.log(promptObjects)
  const promptOptions = {
    // onCancel: (...args: any[]) => console.log({ onCancel: args }),
    // onSubmit: (...args: any[]) => console.log({ onSubmit: args }),
  }

  const res = await prompts(promptObjects as PromptObject[], promptOptions)
  console.log({ res })
}

main().catch(console.error)

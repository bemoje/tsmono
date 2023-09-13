import { colors, strWrapInAngleBrackets, strWrapInBrackets } from '@bemoje/util'
import { Argument, Command, Option } from 'commander'
const { dim, gray } = colors

export interface ICreateCommandOptions {
  command: string
  aliases?: string[]
  summary: string
  description?: string[]
  examples?: string[]
  arguments?: ICreateCommandOptionsArgument[]
  options?: ICreateCommandOptionsOptions[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => void | Promise<void>
}

export interface ICreateCommandOptionsDefault {
  value: unknown
  description?: string
}

export interface ICreateCommandOptionsArgument {
  name: string
  description: string
  isOptional?: boolean
  isRest?: boolean
  default?: ICreateCommandOptionsDefault
  choices?: string[]
}

export interface ICreateCommandOptionsOptions {
  name: string
  char?: string
  description: string
  argument?: string
  isOptional?: boolean
  default?: ICreateCommandOptionsDefault
  choices?: string[]
  conflicts?: string[]
}

export function createCommand(program: Command, options: ICreateCommandOptions): typeof program {
  const command = program.command(options.command).summary(options.summary)

  const bullets = options.description
    ? '\n' + options.description.map((line) => dim('- ') + line).join('\n') + '\n'
    : ''
  const examples = options.examples
    ? '\nExample Usage: \n' + options.examples.map((line) => dim('- ') + line).join('\n')
    : ''
  command.description('Description: ' + options.summary + bullets + examples)

  if (options.aliases) {
    command.aliases(options.aliases)
  }
  if (options.arguments) {
    for (const opt of options.arguments) {
      const { name, description, isOptional, isRest, choices } = opt
      const wrapper = isOptional ? strWrapInBrackets : strWrapInAngleBrackets
      const _name = isRest ? '...' + name : name
      const argument = new Argument(wrapper(_name), description)
      if (opt.default) argument.default(opt.default.value, opt.default.description)
      if (choices) argument.choices(choices)
      command.addArgument(argument)
    }
  }
  if (options.options) {
    for (const opt of options.options) {
      const { name, char, description, argument, isOptional, choices, conflicts } = opt
      const wrapper = isOptional ? strWrapInBrackets : strWrapInAngleBrackets
      const _name = `-${char}, --${name}${argument ? ' ' + wrapper(argument) : ''}`
      const option = new Option(_name, description)
      if (opt.default) option.default(opt.default.value, opt.default.description)
      if (choices) option.choices(choices)
      if (conflicts) option.conflicts(conflicts)
      command.addOption(option)
    }
  }
  command.action(options.action)
  return command
}

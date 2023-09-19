import { colors, strWrapInAngleBrackets, strWrapInBrackets } from '@bemoje/util'
import { Argument, Command, Option } from 'commander'
let i = 0
/**
 * Create a command.
 */
export function createCommand(program: Command, options: ICommand): typeof program {
  if (options.aliases && options.aliases.length) {
    const alias0 = options.command
    options.command = options.aliases.shift() as string
    options.aliases.unshift(alias0)
  }
  const command = program
    .command(options.command)
    .summary((i++ % 2 === 0 ? colors.cyan : colors.green)(options.summary))
    .action(options.action)
  description(command, options)
  aliases(command, options)
  args(command, options.arguments)
  opts(command, options.options)
  return command
}

export interface ICommand {
  command: string
  aliases?: string[]
  summary: string
  details?: string[]
  arguments?: ICommandArgument[]
  options?: ICommandOptions[]
  usage?: ICommandUsage[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => void | Promise<void>
}

export interface ICommandUsage {
  command: string
  description?: string
}

export interface ICommandArgument {
  name: string
  description: string
  isOptional?: boolean
  isRest?: boolean
  isCommaDelimited?: boolean
  default?: {
    value: unknown
    description?: string
  }
  choices?: string[]
}

export interface ICommandOptions {
  name: string
  char?: string
  description: string
  argument?: string
  isOptional?: boolean
  isCommaDelimited?: boolean
  default?: {
    value: unknown
    description?: string
  }
  choices?: string[]
  conflicts?: string[]
}

function description(command: Command, options: ICommand) {
  const { details, summary, usage, aliases } = options
  const toList = (a: string[]) => `\n${a.map((s) => colors.gray(colors.dim('- ')) + s).join('\n')}\n`
  let result = aliases ? 'Aliases: ' + [aliases[0], options.command, ...aliases.slice(1)].join('|') + '\n\n' : ''
  result += 'Description: ' + summary
  if (details) result += toList(details)
  else result += '\n'
  if (usage) {
    const offset = Math.max(...usage.map((u) => u.command.length))
    result += '\nExample Usage:'
    result += toList(
      usage.map((u) => {
        return `${u.command.padEnd(offset, ' ')}  ${u.description}`
      })
    )
  }
  command.description(result)
}

function aliases(command: Command, options: ICommand) {
  if (!options.aliases) return
  command.aliases(options.aliases)
}

function args(command: Command, args?: ICommandArgument[]) {
  if (!args) return
  for (const arg of args) {
    const { name, description, isOptional, isRest, isCommaDelimited, choices } = arg
    const wrapper = isOptional ? strWrapInBrackets : strWrapInAngleBrackets
    const _name = isRest ? name + '...' : name
    const argument = new Argument(wrapper(_name), description)
    if (isCommaDelimited) argument.argParser(parseCommaDelimited)
    if (arg.default) argument.default(arg.default.value, arg.default.description)
    if (choices) argument.choices(choices)
    command.addArgument(argument)
  }
}

function opts(command: Command, options?: ICommandOptions[]) {
  if (!options) return
  for (const opt of options) {
    const { name, char, description, argument, isOptional, isCommaDelimited, choices, conflicts } = opt
    const wrapper = isOptional ? strWrapInBrackets : strWrapInAngleBrackets
    const _name = `-${char}, --${name}${argument ? ' ' + wrapper(argument) : ''}`
    const option = new Option(_name, description)
    if (isCommaDelimited) option.argParser(parseCommaDelimited)
    if (opt.default) option.default(opt.default.value, opt.default.description)
    if (choices) option.choices(choices)
    if (conflicts) option.conflicts(conflicts)
    command.addOption(option)
  }
}

function parseCommaDelimited(string: string): string[] {
  return string
    .split(' ')
    .map((s) => s.trim())
    .filter((s) => s !== '')
}

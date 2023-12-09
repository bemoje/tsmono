import { Argument, Command, Help, Option } from 'commander'
import { colors } from '@bemoje/util'

export const DefaultHelpConfig: Partial<Help> = {
  helpWidth: undefined,
  showGlobalOptions: true,
  sortSubcommands: false,
  sortOptions: false,
  subcommandTerm,
  argumentTerm,
  commandUsage,
  visibleOptions,
  visibleGlobalOptions,
  subcommandDescription,
  optionDescription,
  argumentDescription,
  commandDescription,
  formatHelp,
}

function formatHelp(this: Help, cmd: Command) {
  let result = Help.prototype.formatHelp.call(this, cmd, this)
  result = movePresetOptionsUnderOwnHeader(result)
  result = rearrangeSections(result)
  result = fixLinebreaks(result)
  result = addColors(result)
  return result

  function movePresetOptionsUnderOwnHeader(result: string) {
    const lines = result.split('\n')
    const presetLines = lines.filter((line) => line.includes('[Preset]:'))
    const firstPresetIndex = lines.findIndex((line) => line.includes('[Preset]'))
    if (firstPresetIndex !== -1) {
      lines.splice(firstPresetIndex, presetLines.length)
      lines.push('', 'Preset Options:', ...presetLines)
      result = lines.join('\n')
    }
    return result
  }

  function rearrangeSections(result: string) {
    const order = [
      'Usage:',
      'Version:',
      'Description:',
      'Commands:',
      'Arguments:',
      'Options:',
      'Global Options:',
      'Preset Options:',
    ]
    const blocks: Record<string, unknown> = {}
    let lastAddedBlock = 'Description:'
    result.split(/\n\n+/).forEach((block) => {
      const title = block.split(':')[0].trim() + ':'
      if (/^[A-Z][\w ]+:/.test(title)) {
        blocks[title] = block
        lastAddedBlock = title
        if (!order.includes(title)) order.push(title)
      } else {
        if (!order.includes(lastAddedBlock)) order.push(lastAddedBlock)
        blocks[lastAddedBlock] = ((blocks[lastAddedBlock] || '') + '\n\n' + block).trim()
      }
    })
    result = order
      .map((title) => blocks[title])
      .join('\n\n')
      .trim()
    return result
  }

  function fixLinebreaks(result: string) {
    result = '\n' + result.trim() + '\n\n'
    result = result.replace(/\n\n+/g, '\n\n')
    return result
  }

  function addColors(result: string) {
    result = result.replace(/\|/g, colors.gray(colors.dim('|')))
    result = result.replace(/^[A-Z][\w ]+:/gm, (s) => colors.yellow(s))
    return result
  }
}

function subcommandTerm(this: Help, cmd: Command) {
  const args = cmd.registeredArguments.map((arg) => this.argumentTerm(arg)).join(' ')
  const parent = cmd.parent || cmd
  const padsize = Math.max(1, ...parent.commands.map((c) => c.alias()?.length || 1))
  let alias = cmd.alias() || ' '
  alias = alias.padEnd(padsize, ' ') + ' |'
  return alias + cmd.name() + (args ? ' ' + args : '')
}

function argumentTerm(this: Help, arg: Argument) {
  let r = arg.name()
  const rest = arg.variadic ? '...' : ''
  if (arg.required) r = '<' + r + rest + '>'
  else r = '[' + r + rest + ']'
  return r
}

function commandUsage(this: Help, cmd: Command) {
  const args = cmd.registeredArguments.map((arg) => this.argumentTerm(arg)).join(' ')
  return [cmd.builder.getPrefixString() + ' ' + (args ? args : '[command]'), '[options]'].join(' ')
}

function visibleOptions(this: Help, cmd: Command) {
  const builder = cmd.builder
  const opts = cmd.options.filter((opt) => !opt.hidden && !builder.meta.globalOptions.includes(opt))
  const presets = opts.filter((opt) => opt.description.startsWith('[Preset]'))
  return opts.filter((opt) => !presets.includes(opt)).concat(presets)
}

function visibleGlobalOptions(this: Help, cmd: Command) {
  return cmd.builder.getGlobalOptions()
}

function subcommandDescription(this: Help, cmd: Command) {
  return colors.gray(Help.prototype.subcommandDescription.call(this, cmd))
}

function optionDescription(this: Help, opt: Option) {
  return colors.gray(Help.prototype.optionDescription.call(this, opt))
}

function argumentDescription(this: Help, arg: Argument) {
  return colors.gray(Help.prototype.argumentDescription.call(this, arg))
}

function commandDescription(this: Help, cmd: Command) {
  const v = cmd.builder.getVersion()
  const version = v ? colors.yellow('Version: ') + v + '\n\n' : ''
  const description = 'Description:\n' + Help.prototype.commandDescription.call(this, cmd)
  return version + description
}

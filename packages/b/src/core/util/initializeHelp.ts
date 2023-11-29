import { Argument, Command, Help, HelpContext } from 'commander'
import { colors } from '@bemoje/util'
import { CommandBuilder, getGlobalOptions } from '../CommandBuilder/CommandBuilder'

export function initializeHelp(cb: CommandBuilder) {
  if (cb.isPreset) return
  cb.$.addHelpCommand('?', 'help')
  const help = cb.$.configureHelp()
  help.showGlobalOptions = true
  help.helpWidth = 100

  help.subcommandTerm = (cmd: Command) => {
    const args = cmd.registeredArguments.map((arg) => Help.prototype.argumentTerm.call(help, arg)).join(' ')
    const parent = cmd.parent || cb.$
    const padsize = Math.max(1, ...parent.commands.map((c) => c.alias()?.length || 1))
    let alias = cmd.alias() || ' '
    alias = alias.padEnd(padsize, ' ') + ' |'
    return alias + cmd.name() + (args ? ' ' + args : '')
  }
}

Object.defineProperty(Help.prototype, 'visibleOptions', {
  value: function visibleOptions(this: Help, cmd: Command) {
    return cmd.options.filter((opt) => !opt.hidden && !CommandBuilder.find(cmd).globalOptions.has(opt))
  },
})

Object.defineProperty(Help.prototype, 'visibleGlobalOptions', {
  value: function visibleGlobalOptions(this: Help, cmd: Command) {
    return getGlobalOptions(CommandBuilder.find(cmd))
  },
})

Object.defineProperty(Help.prototype, 'argumentTerm', {
  value: function argumentTerm(this: Help, arg: Argument) {
    let r = arg.name()
    const rest = arg.variadic ? '...' : ''
    if (arg.required) r = '<' + r + rest + '>'
    else r = '[' + r + rest + ']'
    return r
  },
})

Object.defineProperty(Help.prototype, 'commandUsage', {
  value: function commandUsage(this: Help, cmd: Command) {
    const args = cmd.registeredArguments.map((arg) => this.argumentTerm(arg)).join(' ')
    return [cmd.name() + ' ' + (args ? args : '[command]'), '[options]'].join(' ')
  },
})

const original = Command.prototype.helpInformation
Object.defineProperty(Command.prototype, 'helpInformation', {
  value: function helpInformation(this: Command, context?: HelpContext) {
    const cmd = CommandBuilder.find(this)
    if (cmd.isPreset) return cmd.parent?.$.helpInformation(context)
    let result = original.call(this, context) as string
    const blocks = result.split('\n\n')
    const cmdsIndex = blocks.findIndex((block) => block.startsWith('Commands:'))
    const acmds: string[] = []
    const apres: string[] = []
    const alast: string[] = []
    const ahelp: string[] = []
    blocks
      .splice(cmdsIndex, 1)
      .join('')
      .trim()
      .split('\n')
      .forEach((line) => {
        if (line.includes('[Preset]:')) {
          apres.push(line)
        } else if (line.includes(' |util')) {
          alast.push(line)
        } else if (line.includes(' |?')) {
          ahelp.push(line)
        } else {
          acmds.push(line)
        }
      })
    const presets = apres.length ? ['', 'Presets:', ...apres] : []
    const commands = [...acmds, ...alast, ...ahelp, ...presets].join('\n').trim()
    const optsIndex = blocks.findIndex((block) => block.startsWith('Options:') || block.startsWith('Arguments:'))
    blocks.splice(optsIndex, 0, commands)
    result = blocks.join('\n\n')
    result = '\n' + result + '\n\n'
    result = result.replace(/\|/g, colors.dim('|'))
    return result
  },
})

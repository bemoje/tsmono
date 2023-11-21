import { Argument, Command, HelpContext } from 'commander'
import { colors } from '@bemoje/util'
import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function initializeHelp(cb: CommandBuilder) {
  if (!helpInformationReplaced) {
    helpInformationReplaced = true
    const original = Command.prototype.helpInformation
    Object.defineProperty(Command.prototype, 'helpInformation', {
      value: function helpInformation(this: Command, context?: HelpContext) {
        const cmd = CommandBuilder.commandToBuilderMap.get(this) || cb
        if (cmd.isPreset) return cmd.parent?.$.helpInformation(context)
        let result = original.call(this, context) as string
        const blocks = result.split('\n\n')
        const cmdsIndex = blocks.findIndex((block) => block.startsWith('Commands:'))
        const cmds = blocks.splice(cmdsIndex, 1).join('').trim()
        const optsIndex = blocks.findIndex((block) => block.startsWith('Options:') || block.startsWith('Arguments:'))
        blocks.splice(optsIndex, 0, cmds)
        result = blocks.join('\n\n')
        result = '\n' + result + '\n\n'
        result = result.replace(/\|/g, colors.dim('|'))
        return result
      },
    })
  }

  cb.$.addHelpCommand('?', 'help')

  if (cb.isPreset) return

  const help = cb.$.configureHelp()
  help.showGlobalOptions = true
  help.helpWidth = 100

  const argumentTerm = (arg: Argument) => {
    let r = arg.name()
    const rest = arg.variadic ? '...' : ''
    if (arg.required) r = '<' + r + rest + '>'
    else r = '[' + r + rest + ']'
    return r
  }

  help.argumentTerm = argumentTerm

  help.commandUsage = (cmd: Command) => {
    const args = cmd.registeredArguments.map((arg) => argumentTerm(arg)).join(' ')
    return [cmd.name() + ' ' + (args ? args : '[command]'), '[options]'].join(' ')
  }

  help.subcommandTerm = (cmd: Command) => {
    const args = cmd.registeredArguments.map(argumentTerm).join(' ')
    const padsize = Math.max(...cb.$.commands.map((c) => (c.aliases()[0] || '').length))
    let alias = cmd.aliases()[0] || ''
    alias = alias.padEnd(padsize, ' ') + ' |'

    return alias + cmd.name() + (args ? ' ' + args : '')
  }

  help.visibleGlobalOptions = () => {
    return cb.getGlobalOptions()
  }
}

let helpInformationReplaced = false

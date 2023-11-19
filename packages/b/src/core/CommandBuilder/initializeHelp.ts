import { colors } from '@bemoje/util'
import { Command, HelpContext } from 'commander'
import { CommandBuilder } from './CommandBuilder'

export function initializeHelp(this: CommandBuilder) {
  this.$.addHelpCommand('?', 'help')
  const help = this.$.configureHelp()
  help.showGlobalOptions = true
  help.helpWidth = 120

  help.commandUsage = (cmd: Command) => {
    const args = cmd.registeredArguments
      .map((arg) => {
        let r = arg.name()
        const rest = arg.variadic ? '...' : ''
        if (arg.required) r = '<' + r + rest + '>'
        else r = '[' + r + rest + ']'
        return r
      })
      .join(' ')

    return [cmd.name() + (args ? ' ' + args : ''), '[options]'].join(' ')
  }

  help.subcommandTerm = (cmd: Command) => {
    const args = cmd.registeredArguments
      .map((arg) => {
        let r = arg.name()
        const rest = arg.variadic ? '...' : ''
        if (arg.required) r = '<' + r + rest + '>'
        else r = '[' + r + rest + ']'
        return r
      })
      .join(' ')

    const padsize = Math.max(...this.$.commands.map((c) => (c.aliases()[0] || '').length))
    let alias = cmd.aliases()[0] || ''
    alias = alias.padEnd(padsize, ' ') + ' |'

    return alias + cmd.name() + (args ? ' ' + args : '')
  }

  help.visibleGlobalOptions = () => {
    return this.getGlobalOptions()
  }

  if (!helpInformationReplaced) {
    helpInformationReplaced = true
    const superHelpInformation = Command.prototype.helpInformation
    Object.defineProperty(Command.prototype, 'helpInformation', {
      value: function helpInformation(context?: HelpContext) {
        let result = superHelpInformation.call(this, context) as string
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
}

let helpInformationReplaced = false

import { colors } from '@bemoje/util'
import { Command, Help, Option } from 'commander'
import { CommandBuilder } from './CommandBuilder'
import { CTBase } from '../Tree'
import { prefixArray } from '../util/prefixArray'

export class BHelp extends Help {
  constructor(public parent: CommandBuilder) {
    super()
    this.helpWidth = 140
    this.showGlobalOptions = true
    this.sortOptions = false
    this.sortSubcommands = false
  }

  override visibleOptions(cmd: Command): Option[] {
    return cmd.options.filter((option) => {
      return option.name() !== 'help'
    })
  }

  override commandUsage(cmd: Command): string {
    const prefix = prefixArray(this.parent).slice(0, -1).join(' ')
    const name = cmd.name()
    return super
      .commandUsage(cmd)
      .replace(/ \w+\|\w+ /, ' ' + name + ' ')
      .replace(prefix, colors.red(colors.dim(prefix)))
      .replace(name, colors.magenta(colors.bold(name)))
  }

  override formatHelp(cmd: Command, helper: Help): string {
    const alias = [
      'Aliases: ' +
        colors.dim(
          cmd
            .aliases()
            .filter((s) => !!s.trim())
            .concat(cmd.name())
            .map(colors.gray)
            .join(colors.gray('|'))
        ),
      '-------------------\n',
    ]

    const lines = ['-------------------'].concat(super.formatHelp(cmd, helper).split('\n').concat(alias))

    let result = lines
      .map((line) => (line.includes('[inherited]') ? colors.dim(line) : line))
      .join('\n')
      .replace('[cmd]', '[' + '' + colors.green('cmd') + '' + ']')
      .replace('[opt]', '[' + '' + colors.blue('opt') + '' + ']')
      .replace(/\[command\]/gi, '[' + '' + colors.red('cmd') + '' + ']')
      .replace(/\[options\]/gi, '[' + '' + colors.blue('opt') + '' + ']')
      .replace('Usage: ', '')
      .replace('Aliases:', colors.gray('Aliases') + ':')
      .replace('Arguments:', colors.green('Arguments') + ':')
      .replace('Options:', colors.blue('Options') + ':')
      .replace('Commands:', colors.red('Commands') + ':')

    super.visibleArguments(cmd).forEach((arg) => {
      result = result.replace('[' + arg.name(), '[' + colors.green(arg.name()))
    })

    cmd.commands.forEach((cmd) => {
      cmd.registeredArguments.forEach((arg) => {
        result = result.replace('[' + arg.name(), '[' + colors.green(arg.name()))
      })
    })

    return result
  }
}

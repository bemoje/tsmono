import { BCommand } from './BCommand'
import { colors } from '@bemoje/util'
import { Command, Help, Option } from 'commander'

export class BHelp extends Help {
  constructor() {
    super()
    this.helpWidth = 140
    this.showGlobalOptions = true
    this.sortOptions = false
    this.sortSubcommands = false
    const o = new Option('-h, --help', 'display help for command')
    o.attributeName
    o.long
  }

  override commandUsage(cmd: BCommand): string {
    const prefix = cmd.cmdprefix.slice(0, -1).join(' ')
    const name = cmd.name()
    return super
      .commandUsage(cmd)
      .replace(prefix, colors.magenta(colors.dim(prefix)))
      .replace(name, colors.magenta(colors.bold(name)))
  }

  override formatHelp(cmd: Command, helper: Help): string {
    const lines = super.formatHelp(cmd, helper).split('\n')
    lines.splice(
      1,
      0,
      '',
      'Alias: ' +
        colors.dim(
          cmd
            .aliases()
            .filter((s) => !!s.trim())
            .concat(cmd.name())
            .map(colors.magenta)
            .join(colors.gray('|'))
        )
    )

    let result = lines
      .join('\n')
      .replace('[cmd]', '[' + '' + colors.magenta('cmd') + '' + ']')
      .replace('[opt]', '[' + '' + colors.blue('opt') + '' + ']')
      .replace(/\[command\]/gi, '[' + '' + colors.red('cmd') + '' + ']')
      .replace(/\[options\]/gi, '[' + '' + colors.blue('opt') + '' + ']')
      .replace('Usage:', colors.yellow('Usage') + ':')
      .replace('Alias:', colors.cyan('Alias') + ':')
      .replace('Arguments:', colors.magenta('Arguments') + ':')
      .replace('Options:', colors.blue('Options') + ':')
      .replace('Commands:', colors.red('Commands') + ':')

    super.visibleArguments(cmd).forEach((arg) => {
      result = result.replace('[' + arg.name(), '[' + colors.magenta(arg.name()))
    })

    cmd.commands.forEach((cmd) => {
      cmd.registeredArguments.forEach((arg) => {
        result = result.replace('[' + arg.name(), '[' + colors.magenta(arg.name()))
      })
    })

    return result
  }
}

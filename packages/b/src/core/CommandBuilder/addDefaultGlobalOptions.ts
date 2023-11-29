import { CommandBuilder } from './CommandBuilder'

export function addDefaultGlobalOptions(cmd: CommandBuilder) {
  if (!cmd.isRoot) return

  cmd.globalOption('-h, --help', (opt) => {
    opt.description('help')
  })

  cmd.globalOption('-S, --silent', (opt) => {
    opt.description('Mute stderr and stdout.')
    opt.conflicts(['quiet'])
  })

  cmd.globalOption('-D, --debug', (opt) => {
    opt.description('Output debugging information.')
  })

  cmd.globalOption('-T, --trace', (opt) => {
    opt.description('Same as --debug but the command is not executed.')
    opt.conflicts(['quiet', 'silent'])
    opt.implies({ debug: true })
  })

  cmd.globalOption('-Q, --quiet', (opt) => {
    opt.description('Mute stderr and minimuze output to stdout: confirmations, statuses, etc.')
  })
}

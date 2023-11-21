import { CommandBuilder } from './CommandBuilder'

export function addDefaultGlobalOptions(cb: CommandBuilder) {
  if (!cb.parent) {
    cb.globalOption('-Q, --quiet', (opt) => {
      opt.description(
        'Mute stderr and minimuze output to stdout: confirmations, statuses or other unnecessary messages are muted. This is useful when piping.'
      )
    })
    cb.globalOption('-S, --silent', (opt) => {
      opt.description('Mute stderr and stdout.')
      opt.conflicts(['quiet'])
    })
    cb.globalOption('-T, --trace', (opt) => {
      opt.description('Output debugging information.')
      opt.conflicts(['quiet', 'silent'])
    })
    cb.globalOption('-D, --dry-run', (opt) => {
      opt.description(
        'Simulate command without making changes. If the command does not perform any mutable actions, this flag has no effect.'
      )
    })
  }
}

import { CommandBuilder } from '../CommandBuilder'

export function assertNoDuplicateCommandNames(cmd: CommandBuilder): void {
  const names = cmd.$.commands.map((sub) => sub.aliases().concat(sub.name())).flat()
  if (names.length !== new Set(names).size) {
    throw new Error(`Duplicate subcommand names/aliases found for command, ${cmd.name}: ${names.join(', ')}`)
  }
}

import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function* walkChildren(cmd: CommandBuilder, options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
  if (options?.includeSelf && !cmd.parent) yield cmd
  for (const sub of cmd.subcommands) {
    yield sub
    yield* walkChildren(sub)
  }
}

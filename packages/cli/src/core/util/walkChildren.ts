import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function* walkChildren(cmd: CommandBuilder, options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
  if (options?.includeSelf) yield cmd
  for (const sub of cmd.meta.subcommands) {
    yield sub
    yield* walkChildren(sub)
  }
}

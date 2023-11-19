import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function forEachChildRecursive(
  cmd: CommandBuilder,
  callback: (cmd: CommandBuilder) => void | true,
  options?: { includeSelf?: boolean }
): void | true {
  if (options?.includeSelf && !cmd.parent && callback(cmd)) return true
  const subs = cmd.subcommands
  for (let i = 0; i < subs.length; i++) {
    if (callback(subs[i]) || forEachChildRecursive(subs[i], callback)) {
      return true
    }
  }
}

export function* walkChildren(cmd: CommandBuilder, options?: { includeSelf?: boolean }): Generator<CommandBuilder> {
  if (options?.includeSelf && !cmd.parent) yield cmd
  for (const sub of cmd.subcommands) {
    yield sub
    yield* walkChildren(sub)
  }
}

import { CommandBuilder } from '../CommandBuilder/CommandBuilder'

export function forEachChildRecursive(
  cmd: CommandBuilder,
  callback: (cmd: CommandBuilder) => void | true,
  options?: { includeSelf?: boolean }
): void | true {
  if (options?.includeSelf && callback(cmd)) return true
  for (const sub of cmd.subcommands) {
    if (callback(sub) || forEachChildRecursive(sub, callback)) {
      return true
    }
  }
}

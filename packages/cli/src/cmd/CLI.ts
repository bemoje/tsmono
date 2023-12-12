import { CommandBuilder } from './CommandBuilder'

export function CLI(name: string, callback: (this: CommandBuilder, cmd: CommandBuilder) => void) {
  return () => new CommandBuilder(name, callback).commander
}

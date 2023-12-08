import { CommandBuilder } from './CommandBuilder'

export function CLI(name: string, callback: (cmd: CommandBuilder) => void) {
  return () => new CommandBuilder(name).initializeCommand(callback).commander
}

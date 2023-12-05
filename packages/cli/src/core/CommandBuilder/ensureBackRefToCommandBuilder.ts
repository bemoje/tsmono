import { Command } from 'commander'
import { CommandBuilder } from './CommandBuilder'

export function ensureBackRefToCommandBuilder(cmd: CommandBuilder) {
  commandToBuilderMap.set(cmd.$, cmd)
}

const commandToBuilderMap = new WeakMap<Command, CommandBuilder>()

Object.defineProperty(Command.prototype, 'builder', {
  get() {
    const ins = commandToBuilderMap.get(this)
    if (!ins) throw new Error(`CommandBuilder not found for command ${this.name()}`)
    return ins
  },
})

declare module 'commander' {
  interface Command {
    get builder(): CommandBuilder
  }
}

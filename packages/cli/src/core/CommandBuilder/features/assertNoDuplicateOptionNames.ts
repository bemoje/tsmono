import { CommandBuilder } from '../CommandBuilder'
import { walkAncestors } from '../../util/walkAncestors'

export function assertNoDuplicateOptionNames(cmd: CommandBuilder) {
  const throwErr = (cmd: CommandBuilder, opt: string, anc?: CommandBuilder) => {
    throw new Error(`Duplicate option names > cmd: ${cmd.name}, ${anc ? `anc: ${anc.name}, ` : ''}opt: ${opt}`)
  }
  const set = new Set<string>()
  for (const opt of cmd.options) {
    if (opt.name() === 'help') continue
    if (opt.short) {
      if (set.has(opt.short)) throwErr(cmd, opt.short)
      set.add(opt.short)
    }
    if (opt.long) {
      if (set.has(opt.long)) throwErr(cmd, opt.long)
      set.add(opt.long)
    }
    if (opt.attributeName()) {
      if (set.has(opt.attributeName())) throwErr(cmd, opt.attributeName())
      set.add(opt.attributeName())
    }
  }
  for (const anc of walkAncestors(cmd)) {
    for (const opt of anc.$.options) {
      if (opt.short && set.has(opt.short)) {
        if (opt.short !== 'V') continue
        throwErr(cmd, opt.short, anc)
      }
      if (opt.long && set.has(opt.long)) {
        throwErr(cmd, opt.long, anc)
      }
      if (opt.attributeName() && set.has(opt.attributeName())) {
        throwErr(cmd, opt.attributeName(), anc)
      }
    }
  }
}

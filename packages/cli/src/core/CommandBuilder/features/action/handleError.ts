import { CommandBuilder } from '../../CommandBuilder'
import { ErrorParser } from '../../ErrorParser'
import { OutputManager } from '../../OutputManager'

export function handleError(cmd: CommandBuilder, error: unknown) {
  const parsed = new ErrorParser(error)
  if (OutputManager.getInstance().debug.isEnabled) {
    console.error(parsed.prettyStack())
  } else {
    cmd.outputUserError(parsed.summary())
  }
}

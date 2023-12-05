import { CommandBuilder } from '../../CommandBuilder'
import { OutputManager } from '../../OutputManager'

export function handleOutputOptions(cmd: CommandBuilder) {
  const opts = cmd.$.optsWithGlobals()
  const om = OutputManager.getInstance().reset()
  if (opts['disableColor']) om.colors.disable()
  if (opts['disableStderr']) om.stderr.disable()
  if (opts['disableStdout']) om.stdout.disable()
  if (opts['debug']) {
    om.debug.enable()
    om.outputDebugMessages()
  }
}

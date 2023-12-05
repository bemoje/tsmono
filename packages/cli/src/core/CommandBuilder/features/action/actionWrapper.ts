import { CommandBuilder } from '../../CommandBuilder'
import { handleError } from './handleError'
import { handleOutputOptions } from './handleOutputOptions'
import { parsedValidArgsOptsWithPresets } from './parsedValidArgsOptsWithPresets'

/**
 *
 */
export function actionWrapper(cmd: CommandBuilder) {
  const meta = cmd.meta
  cmd.$.action(async () => {
    handleOutputOptions(cmd)
    const [args, opts] = parsedValidArgsOptsWithPresets(cmd)
    if (opts['help'] || !meta.actionHandler) return cmd.outputHelp()
    return await meta.actionHandler(...args, opts, cmd).catch((err) => handleError(cmd, err))
  })
}

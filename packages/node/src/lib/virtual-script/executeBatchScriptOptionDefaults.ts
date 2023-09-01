import { IExecuteBatchScriptOptions } from './IExecuteBatchScriptOptions'

/**
 * The default optionsfor the `execBatch` function.
 * @see executeVirtualBatchScript
 */
export const executeBatchScriptOptionDefaults: Required<IExecuteBatchScriptOptions> = {
  silent: false,
  echo: false,
  prependWithCall: false,
  cwd: process.cwd(),
  tempdir: process.env['TEMP'] || process.env['TMP'] || '',
}

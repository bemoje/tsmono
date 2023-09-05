import { IExecuteBatchScriptOptions } from './IExecuteBatchScriptOptions'

const cwd = process.cwd()

/**
 * The default optionsfor the `execBatch` function.
 * @see executeVirtualBatchScript
 */
export const executeBatchScriptOptionDefaults: Required<IExecuteBatchScriptOptions> = {
  silent: false,
  echo: false,
  prependWithCall: false,
  cwd: cwd,
  tempdir: process.env['TEMP'] || process.env['TMP'] || '',
}

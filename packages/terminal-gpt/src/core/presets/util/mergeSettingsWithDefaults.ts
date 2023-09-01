import { config } from '../../config'
import type { IGptPreset } from '../../types/IGptPreset'

/**
 * Merges the settings for the specified preset with the default settings.
 * @param presetName - The name of the preset.
 */
export function mergeSettingsWithDefaults(presetName: string): IGptPreset {
  const cfg = config.appdata.user
  const res: IGptPreset = cfg.get('presets')[presetName] || cfg.get('presets_examples')[presetName]
  const isDef = <T>(value: T | undefined): value is T => value !== undefined
  if (!isDef(res.temperature)) res.temperature = cfg.get('default_temperature')
  if (!isDef(res.markdownOutput)) res.markdownOutput = cfg.get('default_markdownOutput')
  if (!isDef(res.terminalOutput)) res.terminalOutput = cfg.get('default_terminalOutput')
  if (!isDef(res.openResponseIn)) res.openResponseIn = cfg.get('default_openResponseIn')
  if (!isDef(res.maxExpectedResponseTokens))
    res.maxExpectedResponseTokens = cfg.get('default_maxExpectedResponseTokens')
  if (!isDef(res.inputTokensResponseTokensScalar))
    res.inputTokensResponseTokensScalar = cfg.get('default_inputTokensResponseTokensScalar')
  if (!isDef(res.improveResponse)) res.improveResponse = cfg.get('default_improveResponse')
  if (!isDef(res.model)) res.model = cfg.get('default_model')
  if (!isDef(res.preferGpt4)) res.preferGpt4 = cfg.get('default_preferGpt4')
  return res
}

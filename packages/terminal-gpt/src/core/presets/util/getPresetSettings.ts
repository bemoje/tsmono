import { isDefined } from '@bemoje/validation'
import { config } from '../../config'
import type { IGptPreset } from '../../types/IGptPreset'

export function getPresetSettings(presetName: string): IGptPreset {
  const cfg = config.appdata.user
  const settings: IGptPreset = cfg.get('presets')[presetName] || cfg.get('presets_examples')[presetName]
  if (!isDefined(settings.temperature)) settings.temperature = cfg.get('default_temperature')
  if (!isDefined(settings.markdownOutput)) settings.markdownOutput = cfg.get('default_markdownOutput')
  if (!isDefined(settings.terminalOutput)) settings.terminalOutput = cfg.get('default_terminalOutput')
  if (!isDefined(settings.openResponseIn)) settings.openResponseIn = cfg.get('default_openResponseIn')
  if (!isDefined(settings.maxExpectedResponseTokens))
    settings.maxExpectedResponseTokens = cfg.get('default_maxExpectedResponseTokens')
  if (!isDefined(settings.inputTokensResponseTokensScalar))
    settings.inputTokensResponseTokensScalar = cfg.get('default_inputTokensResponseTokensScalar')
  if (!isDefined(settings.improveResponse)) settings.improveResponse = cfg.get('default_improveResponse')
  if (!isDefined(settings.model)) settings.model = cfg.get('default_model')
  return settings
}

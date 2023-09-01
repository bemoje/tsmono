import { config } from '../../config'
import type { IGptPreset } from '../../types/IGptPreset'

export function getPresetSettings(presetName: string): IGptPreset {
  const cfg = config.appdata.user
  const settings: IGptPreset = cfg.get('presets')[presetName] || cfg.get('presets_examples')[presetName]
  if (!isDef(settings.temperature)) settings.temperature = cfg.get('default_temperature')
  if (!isDef(settings.markdownOutput)) settings.markdownOutput = cfg.get('default_markdownOutput')
  if (!isDef(settings.terminalOutput)) settings.terminalOutput = cfg.get('default_terminalOutput')
  if (!isDef(settings.openResponseIn)) settings.openResponseIn = cfg.get('default_openResponseIn')
  if (!isDef(settings.maxExpectedResponseTokens))
    settings.maxExpectedResponseTokens = cfg.get('default_maxExpectedResponseTokens')
  if (!isDef(settings.inputTokensResponseTokensScalar))
    settings.inputTokensResponseTokensScalar = cfg.get('default_inputTokensResponseTokensScalar')
  if (!isDef(settings.improveResponse)) settings.improveResponse = cfg.get('default_improveResponse')
  if (!isDef(settings.model)) settings.model = cfg.get('default_model')
  if (!isDef(settings.preferGpt4)) settings.preferGpt4 = cfg.get('default_preferGpt4')
  return settings
}

function isDef<T>(value: T | undefined): value is T {
  return value !== undefined
}

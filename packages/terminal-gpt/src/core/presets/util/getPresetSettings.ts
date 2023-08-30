import { config } from '../../config'
import type { IGptPreset } from '../../types/IGptPreset'

export function getPresetSettings(preset: string): IGptPreset {
  const settings: IGptPreset =
    config.appdata.user.get('presets')[preset] || config.appdata.user.get('default_examples')[preset]
  if (!settings.temperature) settings.temperature = config.appdata.user.get('default_temperature')
  if (!settings.markdownOutput) settings.markdownOutput = config.appdata.user.get('default_markdownOutput')
  if (!settings.terminalOutput) settings.terminalOutput = config.appdata.user.get('default_terminalOutput')
  if (!settings.openResponseIn) settings.openResponseIn = config.appdata.user.get('default_openResponseIn')
  if (!settings.maxExpectedResponseTokens)
    settings.maxExpectedResponseTokens = config.appdata.user.get('default_maxExpectedResponseTokens')
  if (!settings.inputTokensResponseTokensScalar)
    settings.inputTokensResponseTokensScalar = config.appdata.user.get('default_inputTokensResponseTokensScalar')
  if (!settings.improveResponse) settings.improveResponse = config.appdata.user.get('default_improveResponse')
  if (!settings.model) settings.model = config.appdata.user.get('default_model')
  return settings
}

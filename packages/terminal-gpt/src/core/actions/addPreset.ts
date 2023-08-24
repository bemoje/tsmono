import { config } from '../config'

/**
 * Add a new preset to the user's configuration.
 * If the preset already exists or the name is reserved, an error message is logged and the function returns.
 *
 * @param name - The name of the preset to add.
 */
export async function addPreset(name: string) {
  if (config.appdata.user.get('presets').name) {
    return console.log(`Preset '${name}' already exists.`)
  }
  if (config.definitions[name]) {
    return console.log(`'${name}' is a reserved name since it is a name of a built-in command..`)
  }
  const presets = config.appdata.user.get('presets')
  presets[name] = {
    description: '',
    temperature: 0.5,
    systemMessage: [],
    markdownOutput: true,
    maxExpectedResponseTokens: 1500,
    openResponseIn: 'chrome',
  }
  config.appdata.user.set('presets', presets)
  await config.editConfigInEditor()
}

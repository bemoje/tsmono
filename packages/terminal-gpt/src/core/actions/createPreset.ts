import { config } from '../config'
import { presetDefaults } from '../presets/presetConfig'

/**
 * Add a new preset to the user's configuration.
 * If the preset already exists or the name is reserved, an error message is logged and the function returns.
 *
 * @param name - The name of the preset to add.
 */
export async function createPreset(name: string): Promise<void> {
  const custom = config.appdata.user.get('presets')
  const examples = config.appdata.user.get('presets_examples')

  if (custom[name] || examples[name]) {
    return console.log(`Preset '${name}' already exists.`)
  }
  if (config.definitions[name]) {
    return console.log(`'${name}' is a reserved name since it is a name of a built-in command..`)
  }
  custom[name] = {
    description: 'Describe your preset.',
    systemMessage: [],
  }
  for (const [key, o] of Object.entries(presetDefaults)) {
    custom[key.replace('default_', '')] = o.default
  }
  config.appdata.user.set('presets', custom)
  await config.editConfigInEditor()
}

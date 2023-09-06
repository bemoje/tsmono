import { config } from '../config'

/**
 * Remove a preset from the user's configuration.
 * If the preset does not exist, an error message is logged and the function returns.
 * @param name - The name of the preset to remove.
 */
export async function removePreset(name: string): Promise<void> {
  const custom = config.appdata.user.get('presets')
  const examples = config.appdata.user.get('presets_examples')

  if (!custom[name] && !examples[name]) {
    return console.log(`Preset '${name}' does not exist.`)
  }

  if (custom[name]) {
    delete custom[name]
    config.appdata.user.set('presets', custom)
  }
  if (examples[name]) {
    delete examples[name]
    config.appdata.user.set('presets_examples', examples)
  }
}

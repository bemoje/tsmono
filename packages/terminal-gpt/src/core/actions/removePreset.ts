import { config } from '../config'

/**
 * Remove a preset from the user's configuration.
 * If the preset does not exist, an error message is logged and the function returns.
 *
 * @param name - The name of the preset to remove.
 */
export async function removePreset(name: string) {
  if (!config.appdata.user.get('presets').name) {
    return console.log(`Preset '${name}' does not exist.`)
  }
  delete config.appdata.user.get('presets').name
}

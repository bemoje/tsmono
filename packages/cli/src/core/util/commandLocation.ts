import { lookpath } from 'lookpath'

/**
 * Get the absolute file path of given command or undefined it does not exist in the PATH.
 * @param command The command to check for.
 */
export async function commandLocation(command: string): Promise<undefined | string> {
  return await lookpath(command)
}

import { lookpath } from 'lookpath'

/**
 * Check whether a command exists in the PATH.
 * @param command The command to check for.
 */
export async function commandExists(command: string): Promise<boolean> {
  return (await lookpath(command)) !== undefined
}

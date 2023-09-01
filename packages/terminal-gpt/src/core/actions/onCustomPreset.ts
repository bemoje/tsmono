import { config } from '../config'

/**
 * Handle a custom preset command.
 *
 * @param opts - An array of options for the command. If a string is provided, it is converted to an array.
 * @param prompt - An array of prompts for the command. If a string is provided, it is converted to an array.
 * @returns A tuple containing the processed prompt and boolean flags for the '16k', 'reply', and 'edit' options.
 * @throws An error if '16k', 'reply', and 'edit' are used at the same time.
 */
export async function onCustomPreset(
  opts: string[] = [],
  prompt: string[] = [],
): Promise<[string, boolean, boolean, boolean]> {
  if (typeof opts === 'string') opts = [opts]
  if (typeof prompt === 'string') prompt = [prompt]
  let _prompt: string = (opts.join(' ').trim() + ' ' + prompt.join(' ').trim()).trim()
  const options = [...opts, ...prompt]

  const is16k = options.includes('16k')
  if (is16k) _prompt = _prompt.replace('16k', '').trim()

  let isReply = options.includes('reply')
  if (isReply) _prompt = _prompt.replace('reply', '').trim()

  const isEdit = options.includes('edit')
  if (isEdit) _prompt = _prompt.replace('edit', '').trim()

  const isImprove = options.includes('improve')
  if (isImprove) {
    isReply = true
    _prompt = _prompt.replace('improve', config.appdata.user.get('default_improveResponse')).trim()
  }

  return [_prompt, is16k, isReply, isEdit]
}

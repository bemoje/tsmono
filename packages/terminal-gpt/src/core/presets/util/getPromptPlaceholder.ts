/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getPreviousInteraction } from './getPreviousInteraction'

/**
 * This function gets the placeholder.
 * @param jsondir - The json directory.
 * @returns The placeholder.
 */
export function getPromptPlaceholder(jsondir: string, isEdit: boolean) {
  const prevJson = getPreviousInteraction(jsondir)
  if (!prevJson) return ''
  if (isEdit) return prevJson.data.messages![prevJson.data.messages!.length - 2].content || ''
  return ''
}

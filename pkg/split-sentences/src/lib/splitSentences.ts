import { split } from 'sentence-splitter'

/**
 * Intelligently split a string into sentences.
 * @throws Will throw an error if the input is not a string.
 * @param text Text to split into sentences.
 * @example ```ts
 * splitSentences('Hello world. How are you?');
 * //=> ['Hello world.', 'How are you?']
 * ```
 */
export function splitSentences(text: string): string[] {
  if (!text) return []
  return split(text)
    .filter((node) => node.type === 'Sentence')
    .map((node) => node.raw)
}

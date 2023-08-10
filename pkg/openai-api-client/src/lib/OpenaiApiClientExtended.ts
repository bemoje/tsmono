import { OpenaiApiClient } from './OpenaiApiClient'
import { IOpenaiApiClientOptions } from './types/IOpenaiApiClientOptions'
import type { IOpenaiChatRequestOptions } from './types/IOpenaiChatRequestOptions'

/**
 * A class representing an OpenAI API client but with already prompt-egineered utilities.
 */
export class OpenaiApiClientExtended extends OpenaiApiClient {
  /**
   * Create a new OpenAiApiClient instance.
   * @example
   * ```ts
   * const openai = new OpenaiAPIClient({ apiKey: "API_KEY" })
   * ```
   */
  constructor(options: IOpenaiApiClientOptions = {}) {
    super(options)
  }

  /**
   * Proofread in a given language.
   * @param language The language of the input.
   * @param prompt The input string.
   * @example ```ts
   * await openai.proofread('english', 'I no have more money.')
   * await openai.proofread('java', `System.out.println("Hello")`)
   * ```
   */
  async proofread(language: string, prompt: string, options: IOpenaiChatRequestOptions = {}): Promise<string> {
    options.instruction =
      (options.instruction ? options.instruction + '\n\n' : '') +
      `You will be provided with statements, and your task is to convert them to standard ${language.toLowerCase()}.\n\n` +
      `Respond with the corrected text and nothing else.`

    return await this.gpt3_8k({
      temperature: 0,
      ...options,
      prompt,
    })
  }

  /**
   * Proofread in English.
   * @param prompt The input string.
   * @example ```ts
   * await openai.proofread('english', 'I no have more money.')
   * await openai.proofread('java', `System.out.println("Hello")`)
   * ```
   */
  async proofreadEnglish(prompt: string, options: IOpenaiChatRequestOptions = {}): Promise<string> {
    return await this.proofread('English', prompt, options)
  }

  /**
   * Translate text from one language to another.
   * For short input text, use options.instruction to provide context.
   * @param prompt The text to translate.
   * @example ```ts
   * await openai.translateFrom('English', 'Spanish', 'Clear', { instruction: 'This is a color.' })
   * ```
   */
  async translateFromTo(
    fromLanguage: string,
    toLanguage: string,
    prompt: string,
    options: IOpenaiChatRequestOptions = {},
  ): Promise<string> {
    options.instruction =
      (options.instruction ? options.instruction + '\n\n' : '') +
      `Translate from ${fromLanguage.toLowerCase()} to ${toLanguage.toLowerCase()}.`
    return await this.gpt3_8k({
      temperature: 0.3,
      ...options,
      prompt,
    })
  }

  /**
   * Translate text from English to a given language.
   * For short input text, use options.instruction to provide context.
   * @example ```ts
   * await openai.translateEnglishTo('Spanish', 'Clear', { instruction: 'This is a color.' })
   * ```
   */
  async translateEnglishTo(language: string, prompt: string, options: IOpenaiChatRequestOptions = {}): Promise<string> {
    return await this.translateFromTo('English', language, prompt, options)
  }
}

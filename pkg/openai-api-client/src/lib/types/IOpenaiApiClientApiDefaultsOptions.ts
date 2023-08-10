export interface IOpenaiApiClientApiDefaultsOptions {
  /**
   * Default model to use for completion requests
   */
  completionModel?: string

  /**
   * Default model to use for chat gpt3 8k tokens completion requests
   */
  chat3_8Model?: string

  /**
   * Default model to use for chat gpt3 16k tokens completion requests
   */
  chat3_16Model?: string

  /**
   * Default model to use for chat gpt4 8k tokens completion requests
   */
  chat4_8Model?: string

  /**
   * If openai api returns more than one choice, this string will be used to delimit them.
   */
  choicesDelimiter?: string
}

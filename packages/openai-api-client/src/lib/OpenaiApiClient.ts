import { AbstractApiClient, IAsyncRetryOptions, IResponseCacheOptions } from '@bemoje/api-util'
import { randomIntBetween } from '@bemoje/number'
import { objOmitKeysMutable } from '@bemoje/object'
import fs from 'fs'
import { encode } from 'gpt-3-encoder'
import type * as openai from 'openai'
import { Configuration, OpenAIApi } from 'openai'
import { openaiApiErrorCodes } from './data/openaiApiErrorCodes'
import { IOpenaiApiClientApiDefaultsOptions } from './types/IOpenaiApiClientApiDefaultsOptions'
import { IOpenaiApiClientOptions } from './types/IOpenaiApiClientOptions'
import { IOpenaiChatRequestOptions } from './types/IOpenaiChatRequestOptions'
import { IOpenaiCompletionRequestOptions } from './types/IOpenaiCompletionRequestOptions'
import { IOpenaiTranscribeOptions } from './types/IOpenaiTranscribeOptions'
import { IOpenaiTranscribeRequest } from './types/IOpenaiTranscribeRequest'
export type * as openai from 'openai'

/**
 * A class representing an OpenAI API client.
 */
export class OpenaiApiClient extends AbstractApiClient {
  /**
   * API client instance
   */
  readonly client: OpenAIApi

  /**
   * Defaults for API requests. Can be overriden in individual method calls.
   */
  readonly apiDefaults: IOpenaiApiClientApiDefaultsOptions = {
    completionModel: 'text-davinci-003',
    chat3_8Model: 'gpt-3.5-turbo',
    chat3_16Model: 'gpt-3.5-turbo-16k',
    chat4_8Model: 'gpt-4',
    choicesDelimiter: '\n---------------\n',
  }

  protected concurrencyJustReduced = false

  /**
   * Create a new OpenaiApiClient instance.
   * @param options - The constructor options to use.
   */
  constructor(options: IOpenaiApiClientOptions = {}) {
    super(options)
    const apiKey = options.apiKey
    this.client = new OpenAIApi(new Configuration({ apiKey }))
  }

  /**
   * Send a completion request to the openai api.
   * @param options - The options to use.
   */
  async completion(options: IOpenaiCompletionRequestOptions): Promise<string> {
    return await this._completion(...this.handleCompletionOptions(options))
  }

  /**
   * Send a chat completion request to the openai api with a max_tokens cap of 4096.
   * @param options - The options to use.
   */
  async gpt3_8k(options: IOpenaiChatRequestOptions): Promise<string> {
    return await this._chat(...this.handleChatOptions(options))
  }

  /**
   * Send a chat completion request to the openai api with a max_tokens cap of 16384.
   * @param options - The options to use.
   */
  async gpt3_16k(options: IOpenaiChatRequestOptions): Promise<string> {
    options.model = this.apiDefaults.chat3_16Model
    return await this._chat(...this.handleChatOptions(options))
  }

  /**
   * Send a gpt4 chat completion request to the openai api with a max_tokens cap of 8k.
   * @param options - The options to use.
   */
  async gpt4_8k(options: IOpenaiChatRequestOptions): Promise<string> {
    options.model = this.apiDefaults.chat4_8Model
    return await this._chat(...this.handleChatOptions(options))
  }

  /**
   * Send a transcribe completion request to the openai api.
   * @param options - The options to use.
   */
  async transcribe(options: IOpenaiTranscribeOptions): Promise<string> {
    return await this._transcribe(...this.handleTranscribeOptions(options))
  }

  /**
   * Handle completion options.
   * @param options - The options to handle.
   */
  protected handleCompletionOptions(
    options: IOpenaiCompletionRequestOptions,
  ): [openai.CreateCompletionRequest, IAsyncRetryOptions, IResponseCacheOptions] {
    options = this.deleteDefaultOrUndefinedOptions(options, {
      presence_penalty: 0,
      frequency_penalty: 0,
      best_of: 1,
    })
    if (!options.model) options.model = this.apiDefaults.completionModel
    if (options.instruction) options.prompt = options.instruction + '\n\n' + options.prompt
    if (!options.max_tokens) {
      const count = this.countTokens(options.prompt as string)
      if (options.response_max_tokens) {
        options.max_tokens = count + options.response_max_tokens
      } else {
        options.max_tokens = 4096 - count
      }
    }
    options = objOmitKeysMutable<any>(options, 'retry', 'cache', 'instruction', 'response_max_tokens')
    const request = options as openai.CreateCompletionRequest
    const retry = this.handleRetryOptions(options.retry)
    const cache = this.handleCacheOptions(options.cache)
    return this.emit('request', [request, retry, cache])
  }

  /**
   * Handle chat options.
   * @param options - The options to handle.
   */
  protected handleChatOptions(
    options: IOpenaiChatRequestOptions,
  ): [openai.CreateChatCompletionRequest, IAsyncRetryOptions, IResponseCacheOptions] {
    options = this.deleteDefaultOrUndefinedOptions(options, {
      presence_penalty: 0,
      frequency_penalty: 0,
    })
    const retry = this.handleRetryOptions(options.retry)
    const cache = this.handleCacheOptions(options.cache)
    const model = this.apiDefaults.chat3_8Model
    const messages: openai.ChatCompletionRequestMessage[] = []
    if (options.instruction) messages.push({ role: 'system', content: options.instruction })
    if (options.prompt) messages.push({ role: 'user', content: options.prompt })
    if (options.messages) messages.push(...options.messages)
    if (!messages.length) messages.push({ role: 'user', content: '' })
    options = objOmitKeysMutable<any>(options, 'prompt', 'instruction', 'retry', 'cache')
    const request = { model, ...options, messages } as openai.CreateChatCompletionRequest
    return this.emit('request', [request, retry, cache])
  }

  /**
   * Handle transcribe options.
   * @param options - The options to handle.
   */
  protected handleTranscribeOptions(
    options: IOpenaiTranscribeOptions,
  ): [IOpenaiTranscribeRequest, IAsyncRetryOptions, IResponseCacheOptions] {
    const request = options.request as IOpenaiTranscribeRequest
    const retry = this.handleRetryOptions(options.retry)
    const cache = this.handleCacheOptions(options.cache)
    return this.emit('request', [request, retry, cache])
  }

  /**
   * Send completion request to the openai API.
   * This is used by all the preset methods, the public methods: completion.
   * @param request - The request object to send to the openai api.
   * @param retry - The retry options.
   * @param cache - The cache options.
   */
  protected async _completion(
    request: openai.CreateCompletionRequest,
    retry: IAsyncRetryOptions,
    cache: IResponseCacheOptions,
  ): Promise<string> {
    return await this.sendRequest({
      apiRequest: async () => {
        const { data } = await this.client.createCompletion(request)
        this.assertReponseDataComplete(data)
        return this.parseChoices(data.choices).join(this.apiDefaults.choicesDelimiter)
      },
      args: [request],
      retry,
      cache,
    })
  }

  /**
   * Send chat request to the openai API.
   * This is used by all the preset methods, the public methods: chat3_8, chat3_16, and chat4_8.
   * @param request - The request object to send to the openai api.
   * @param retry - The retry options.
   * @param cache - The cache options.
   */
  protected async _chat(
    request: openai.CreateChatCompletionRequest,
    retry: IAsyncRetryOptions,
    cache: IResponseCacheOptions,
  ): Promise<string> {
    return await this.sendRequest({
      apiRequest: async () => {
        let data
        try {
          const response = await this.client.createChatCompletion(request)
          data = response.data
        } catch (error: any) {
          this.handleApiError(error)
        }
        this.assertReponseDataComplete(data as openai.CreateChatCompletionResponse)
        return this.parseChoices((data as openai.CreateChatCompletionResponse).choices)[0]
      },
      args: [request],
      retry,
      cache,
    })
  }

  /**
   * Send transcribe (speech to text) request to the openai API.
   * @param request - The request object to send to the openai api.
   * @param retry - The retry options.
   * @param cache - The cache options.
   */
  protected async _transcribe(
    request: IOpenaiTranscribeRequest,
    retry: IAsyncRetryOptions,
    cache: IResponseCacheOptions,
  ): Promise<string> {
    return await this.sendRequest({
      apiRequest: async () => {
        try {
          const { data } = await this.client.createTranscription(
            fs.createReadStream(request.filepath) as any,
            'whisper-1',
            undefined,
            request.format,
            undefined,
            request.language,
          )
          return data.toString().trim()
        } catch (error: any) {
          console.error(error.toJSON())
        }
        return ''
      },
      args: [request],
      retry,
      cache,
    })
  }

  /**
   * Parses API error codes.
   * When the error is a rate limit error, lowers the concurrency.
   * @param error - The error to parse.
   */
  protected handleApiError(error: any): void {
    const json = error.toJSON()
    const status = json.status
    if (status === 429) this.lowerConcurrency()
    const description = openaiApiErrorCodes.get(status)
    if (description) error = new Error('Error code ' + status + ': ' + description)
    this.emit('error', json)
    throw error
  }

  /**
   * Lower the concurrency to prevent rate limiting.
   * Automatically raises the concurrency again after a delay.
   * @param lowerBy - The amount to lower the concurrency by.
   * @param raiseAgainBy - The amount to raise the concurrency by after a delay.
   * @param delay - The delay to wait before raising the concurrency again. This is randomized by +/- 5 seconds to prevent multiple requests from affecting the concurrency at the same time.
   */
  protected lowerConcurrency(lowerBy = 7, raiseAgainBy = 6, delay = 1000 * 90): void {
    if (this.concurrencyJustReduced || this.queue.concurrency <= 20) return
    this.concurrencyJustReduced = true
    setTimeout(() => {
      this.concurrencyJustReduced = false
    }, 1000)
    this.queue.concurrency -= lowerBy
    this.emit('concurrency', 'Reducing concurrency to ' + this.queue.concurrency + ' to prevent rate limiting.')
    delay = randomIntBetween(5000, delay)
    setTimeout(() => {
      this.queue.concurrency += raiseAgainBy
      this.emit('concurrency', 'Trying to raise concurrency again to ' + this.queue.concurrency + '.')
    }, delay)
  }

  /**
   * Extract the actual concent from the 'choices' object from the response data.
   * @param choices - The choices object from the response data.
   */
  protected parseChoices(
    choices: openai.CreateChatCompletionResponseChoicesInner[] | openai.CreateCompletionResponseChoicesInner[],
  ): string[] {
    return choices.map((choice) => {
      if (Reflect.has(choice, 'text')) {
        return Reflect.get(choice, 'text').trim()
      } else if (Reflect.has(choice, 'message')) {
        return Reflect.get(choice, 'message').content.trim()
      }
    })
  }

  /**
   * Delete all options that are undefined or equal to the default value.
   * The response cache uses hashed options to determine if the request has already been made.
   * Removing default values and undefined values normalizes the options object so it hashes the same.
   * @param options - The options to delete from.
   * @param defaults - The default values to compare against.
   */
  protected deleteDefaultOrUndefinedOptions<T extends Record<string, any>>(
    options: T,
    defaults: Record<string, any> = {},
  ): T {
    options = Object.assign({}, options)
    defaults.temperature = 1
    defaults.top_p = 1
    defaults.n = 1
    for (const [key, value] of Object.entries(defaults)) {
      if (Reflect.get(options, key) === value) {
        Reflect.deleteProperty(options, key)
      }
    }
    for (const [key, value] of Object.entries(options)) {
      if (!value && value !== 0) {
        Reflect.deleteProperty(options, key)
      }
    }
    return options
  }

  /**
   * Assert that the response data is complete by verifying that all returned choices have finish_reason: stop.
   */
  protected assertReponseDataComplete(
    data: openai.CreateChatCompletionResponse | openai.CreateCompletionResponse,
  ): void {
    for (const choice of data.choices) {
      if (choice.finish_reason !== 'stop') {
        this.emit('error', 'Expected finish_reason to be: stop. Got: ' + choice.finish_reason)
      }
    }
  }

  /**
   * Encode a string into tokens.
   * @param string - The string to encode.
   */
  stringTokens(string: string): number[] {
    return encode(string)
  }

  /**
   * Count the number of tokens in a string.
   * @param string - The string to count tokens in.
   */
  countTokens(string: string): number {
    return encode(string).length
  }
}

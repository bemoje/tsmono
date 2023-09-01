import { getApiClient } from './getApiClient'
import { ISendChatRequestOptions } from './types/ISendChatRequestOptions'

/**
 * Sends a chat request to the OpenAI API.
 * This function first calculates the number of tokens in the request and determines the appropriate GPT model to use based on the token count.
 * If the request is too large, the function will exit and prompt the user to try again with a smaller request.
 * If the request is within the acceptable token range, the function will send the request to the OpenAI API using the selected GPT model.
 * The function then counts the tokens in the response and returns the response.
 * Exits the process if the request is too large.
 * @param options - The options for the chat request. This includes the maximum expected response tokens and the request itself.
 * @returns A promise that resolves to the response from the OpenAI API.
 */
export async function sendChatRequest(options: ISendChatRequestOptions): Promise<string> {
  const { request, settings } = options
  const { model, preferGpt4 } = settings
  const api = getApiClient()
  if (!request.messages) throw new Error('request.messages is undefined')
  const instruction_tokens = api.countTokens(JSON.stringify(request.messages[0]) || '')
  const prompt_tokens = api.countTokens(JSON.stringify(request.messages.slice(1)) || '')
  const request_tokens = instruction_tokens + prompt_tokens
  const inputTokensResponseTokensScalar = settings.inputTokensResponseTokensScalar
  const maxExpectedResponseTokens =
    settings.maxExpectedResponseTokens + Math.floor(prompt_tokens * inputTokensResponseTokensScalar)
  const gpt_model_selection_cutoff_tokens = Math.max(0, 8000 - maxExpectedResponseTokens - prompt_tokens)
  const max_tokens = 16000 - maxExpectedResponseTokens
  const above_cutoff = request_tokens > gpt_model_selection_cutoff_tokens
  const tokenDetails = {
    request_tokens,
    maxExpectedResponseTokens,
    gpt_model_selection_cutoff_tokens,
    max_tokens,
  }

  // exit if the request is too large
  if (request_tokens > max_tokens) {
    console.log(tokenDetails)
    console.log('The request is too large. Please try again with a smaller request.')
    process.exit(0)
  }

  if (model) request.model = model

  // output token details to user
  const gpt_model =
    above_cutoff || options.is16k ? 'gpt-3.5-turbo-16k' : model ? model : preferGpt4 ? 'gpt4' : 'gpt-3.5-turbo'
  console.log()
  console.log({ ...tokenDetails, gpt_model })
  console.log('\nPlease wait for OpenAI to respond...\n')

  // sent request to openai (prefer gpt4 if not too many tokens)
  const response =
    above_cutoff || options.is16k
      ? await api.gpt3_16k(request)
      : model
      ? await api.gpt3_16k({ model, ...request })
      : preferGpt4
      ? await api.gpt4_8k(request)
      : await api.gpt3_8k(request)

  const response_tokens = api.countTokens(response)
  console.log({ response_tokens })
  return response
}

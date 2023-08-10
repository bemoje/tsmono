import { config } from '../config'
import { getApiClient } from './getApiClient'
import { ISendChatRequestOptions } from './types/ISendChatRequestOptions'

export async function sendChatRequest(options: ISendChatRequestOptions): Promise<string> {
  const { maxExpectedReponseTokens, request } = options
  const api = getApiClient()
  const request_tokens = api.countTokens(request.instruction || '' + request.prompt)
  const gpt_model_selection_cutoff_tokens = 8000 - maxExpectedReponseTokens
  const max_tokens = 16000 - maxExpectedReponseTokens
  const above_cutoff = request_tokens > gpt_model_selection_cutoff_tokens
  const tokenDetails = {
    request_tokens,
    emails_maxExpectedReponseTokens: maxExpectedReponseTokens,
    gpt_version_cutoff_tokens: gpt_model_selection_cutoff_tokens,
    max_tokens,
  }

  // exit if the request is too large
  if (request_tokens > max_tokens) {
    console.log(tokenDetails)
    console.log('The request is too large. Please try again with a smaller request.')
    process.exit(0)
  }

  // output token details to user
  const gpt_model = above_cutoff ? 'gpt-3.5-turbo-16k' : config.settings.prefer_gpt4 ? 'gpt4' : 'gpt-3.5-turbo'
  console.log()
  console.log({ ...tokenDetails, gpt_model })
  console.log('\nPlease wait for OpenAI to respond...\n')

  // sent request to openai (prefer gpt4 if not too many tokens)
  const response = above_cutoff
    ? await api.gpt3_16k(request)
    : config.settings.prefer_gpt4
    ? await api.gpt4_8k(request)
    : await api.gpt3_8k(request)

  const response_tokens = api.countTokens(response)
  console.log({ response_tokens })
  return response
}

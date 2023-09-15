import { OpenaiApiClient } from '@bemoje/openai-api-client'
import fs from 'fs'
import { config } from './config'

/**
 * This function is used to get an instance of the OpenAI API client.
 * It first checks if the API key is stored in the user's configuration.
 * If the API key is not found, it checks if the API key is stored in a file.
 * If the API key is still not found, it logs an error message and terminates the process.
 * If the API key is found, it creates a new instance of the OpenAI API client with the API key and cache configuration.
 * It also sets up event listeners for 'retry' and 'error' events on the API client and the cache.
 * @returns An instance of the OpenAI API client.
 */
export function getApiClient() {
  const apiKey = config.data.user.get('apiKey').startsWith('sk-')
    ? config.data.user.get('apiKey')
    : fs.existsSync(config.data.user.get('apiKey'))
    ? fs.readFileSync(config.data.user.get('apiKey'), 'utf8').trim()
    : ''

  if (apiKey.startsWith('sk-')) {
    config.data.user.set('apiKey', apiKey)
  } else {
    console.error(
      'No api key found. Please set your api key in the config: gpt config-set apiKey <your-api-key-OR-path-to-keyfile>'
    )
    process.exit(1)
  }

  const api = new OpenaiApiClient({
    apiKey,
    cache: { name: 'terminal-gpt', enable: true, maxAgeMs: 1000 * 60 * 60 * 24 * 7 },
  })
  api.events.on('retry', () => console.log('retrying...'))
  api.events.on('error', (error) => console.log('An error occured: ' + error.message))
  api.cache?.events.on('error', (error) => console.log('An error occured: ' + error.message))
  return api
}

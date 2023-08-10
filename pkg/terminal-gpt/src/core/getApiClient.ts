import { OpenaiApiClient } from '@bemoje/openai-api-client'
import fs from 'fs'
import { config } from '../config'

export function getApiClient() {
  const apiKey = config.settings.api_key.startsWith('sk-')
    ? config.settings.api_key
    : fs.existsSync(config.settings.api_key)
    ? fs.readFileSync(config.settings.api_key, 'utf8').trim()
    : ''
  const api = new OpenaiApiClient({
    apiKey,
    cache: { name: 'terminal-gpt', enable: true },
  })
  api.events.on('retry', () => console.log('retrying...'))
  api.events.on('error', (error) => console.log('An error occured: ' + error.message))
  api.cache?.events.on('error', (error) => console.log('An error occured: ' + error.message))
  return api
}

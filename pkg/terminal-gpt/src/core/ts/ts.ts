import { strWrapIn } from '@bemoje/string'
import { execSync } from 'child_process'
import { cyan, green } from 'cli-color'
import fs from 'fs'
import path from 'path'
import { config } from '../config'
import { sendChatRequest } from '../sendChatRequest'
import { userInput } from '../userInput'

export async function ts(prompt?: string) {
  const { ts_defaultTemperature, ts_systemMessage, ts_maxExpectedReponseTokens, ts_openResponseIn } = config.settings

  const { temperature, instruction, input } = prompt
    ? { temperature: ts_defaultTemperature, instruction: ts_systemMessage.join('\n'), input: prompt }
    : await userInput(ts_defaultTemperature, ts_systemMessage, config.settings.ts_lastInput, '.txt')

  config.settings.ts_lastInput = input
  config.saveConfigFile()

  console.log(green(strWrapIn(input, '\n')))

  let response = await sendChatRequest({
    maxExpectedReponseTokens: ts_maxExpectedReponseTokens,
    request: { temperature, instruction, prompt: input, retry: { retries: 2 } },
  })

  console.log(cyan(strWrapIn(response, '\n')))

  response =
    '## REQUEST\n\n#### System Message\n' +
    '```\n' +
    instruction +
    '\n```' +
    '\nTemperature: ' +
    temperature +
    '\n\n#### Prompt\n\n' +
    '```\n' +
    input +
    '\n```' +
    '\n\n## RESPONSE\n\n' +
    response

  const tempfile = path.join(config.appdataDirectory, 'ts', Date.now() + '.md')
  console.log({ tempfile })
  fs.mkdirSync(path.dirname(tempfile), { recursive: true })
  fs.writeFileSync(tempfile, response, 'utf8')
  execSync(`start ${ts_openResponseIn} ${tempfile}`, { stdio: 'inherit' })
}

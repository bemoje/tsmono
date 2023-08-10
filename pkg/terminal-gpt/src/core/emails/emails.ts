import { strWrapIn } from '@bemoje/node-util'
import {
  blackBright,
  blueBright,
  bold,
  cyanBright,
  Format,
  greenBright,
  magentaBright,
  red,
  underline,
  yellowBright,
} from 'cli-color'
import { config } from '../../config'
import { sendChatRequest } from '../sendChatRequest'
import { userInput } from '../userInput'
import { extractContactsFromEmails } from './util/extractContactsFromEmails'
import { shortenNames } from './util/shortenNames'
import { splitEmails } from './util/splitEmails'

export async function emails() {
  const { emails_defaultTemperature, emails_systemMessage, emails_maxExpectedReponseTokens } = config.settings
  const { temperature, instruction, input } = await userInput(emails_defaultTemperature, emails_systemMessage)

  const prompt = splitEmails(input).join('\n\r\n---------------------------\n\r\n')

  let response = await sendChatRequest({
    maxExpectedReponseTokens: emails_maxExpectedReponseTokens,
    request: { temperature, instruction, prompt, retry: { retries: 2 } },
  })

  // extract names from the thread
  const fullNames = extractContactsFromEmails(prompt)

  // convert to first names (except when multiple people have the same first name)
  const shortNames = shortenNames(fullNames.map((name) => name[0])).map((name, i) => [name, fullNames[i][1]])

  // remove the year from dates from the current year
  response = response.replace(new RegExp(`, ${new Date().getFullYear()}: `, 'g'), ': ')

  // insert peoples names at the bottom
  const people = shortNames.map(([name, email]) => name + blackBright(' | ' + email.substring(email.indexOf('@') + 1)))
  response += '\n\n' + underline(bold('People')) + ':\n - ' + people.join('\n - ')

  // replace full names with shortened names
  fullNames.forEach((fullname, i) => {
    response = response.replace(new RegExp(fullname[0], 'gi'), shortNames[i][0])
  })

  // colorize each name in different colors
  const colors = [blueBright, cyanBright, greenBright, magentaBright, red, yellowBright]
  const namescolors: [string, Format][] = shortNames.map(([name], i) => [name, colors[i % colors.length]])
  for (const [name, color] of namescolors) {
    response = response.replace(new RegExp(name, 'gi'), color(name))
  }

  // headers in bold text
  response = response
    .replace(new RegExp('^Summary', 'gmi'), underline(bold('Summary')))
    .replace(new RegExp('^Action( items)', 'gmi'), underline(bold('Action items')))

  // output result to user
  console.log(strWrapIn(response, '\n'))
}

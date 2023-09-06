// import { strWrapIn } from '@bemoje/string';
// import { gray, blueBright, bold, cyanBright, Format, greenBright, magentaBright, red, underline, yellowBright } from '';
// import { config } from '../config';
// import { sendChatRequest } from '../sendChatRequest';
// import { userInput } from '../userInput';
// import { extractContactsFromEmails } from './util/extractContactsFromEmails';
// import { shortenNames } from './util/shortenNames';
// import { splitEmails } from './util/splitEmails';

/**
 * The emails function is responsible for handling the emails command.
 * It retrieves user data from the configuration, prompts the user for input,
 * sends a chat request, extracts and shortens names from the email thread,
 * formats the response, and finally outputs the result to the user.
 */
// export async function emails() {
//   const { emails_temperature, emails_systemMessage, emails_maxExpectedResponseTokens } = config.appdata.user.data
//   const { emails_yourName, emails_yourEmail, emails_companyName } = config.appdata.user.data

//   config.appdata.user.set('emails_yourName', emails_yourName)
//   const { temperature, instruction, input } = await userInput(
//     emails_temperature,
//     emails_systemMessage
//       .join('\n')
//       .replace(/\{\{emails_yourName\}\}/g, emails_yourName)
//       .replace(/\{\{emails_yourEmail\}\}/g, emails_yourEmail)
//       .replace(/\{\{emails_companyName\}\}/g, emails_companyName)
//       .split('\n'),
//   )
//   const prompt = splitEmails(input).join('\n\r\n---------------------------\n\r\n')
//   const request = {
//     temperature,
//     messages: [
//       { role: 'system', content: instruction },
//       { role: 'user', content: prompt },
//     ],
//     retry: { retries: 2 },
//   }

//   let response = await sendChatRequest({
//     {maxExpectedResponseTokens: emails_maxExpectedResponseTokens},
//     request,
//     is16k:false,
//   } as ISendChatRequestOptions)

//   // extract names from the thread
//   const fullNames = extractContactsFromEmails(prompt)

//   // convert to first names (except when multiple people have the same first name)
//   const shortNames = shortenNames(fullNames.map((name) => name[0])).map((name, i) => [name, fullNames[i][1]])

//   console.log({ fullNames, shortNames })

//   // remove the year from dates from the current year
//   response = response.replace(new RegExp(`, ${new Date().getFullYear()}: `, 'g'), ': ')

//   // insert peoples names at the bottom
//   const people = shortNames.map(([name, email]) => name + gray(' | ' + email.substring(email.indexOf('@') + 1)))
//   response += '\n\n' + underline(bold('People')) + ':\n - ' + people.join('\n - ')

//   // replace full names with shortened names
//   fullNames.forEach((fullname, i) => {
//     response = response.replace(new RegExp(fullname[0], 'gi'), shortNames[i][0])
//   })

//   // colorize each name in different colors
//   const colors = [blueBright, cyanBright, greenBright, magentaBright, red, yellowBright]
//   const namescolors: [string, Format][] = shortNames.map(([name], i) => [name, colors[i % colors.length]])
//   for (const [name, color] of namescolors) {
//     response = response.replace(new RegExp(name, 'gi'), color(name))
//   }

//   // headers in bold text
//   response = response
//     .replace(new RegExp('^Summary', 'gmi'), underline(bold('Summary')))
//     .replace(new RegExp('^Action( items)', 'gmi'), underline(bold('Action items')))

//   // output result to user
//   console.log(strWrapIn(response, '\n'))
// }

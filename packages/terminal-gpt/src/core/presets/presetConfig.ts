import {
  parseBoolean,
  parseInteger,
  parseJsonObject,
  parseNumber,
  parseString,
  validateBoolean,
  validateInteger,
  validateNumber,
  validateString,
  validateStringArray,
  validateStringType,
} from '@bemoje/commander-config'
import { getOS, isLinuxProgramInstalled } from '@bemoje/util'
import { IGptPreset } from '../types/IGptPreset'

const improveResponse = [
  'Can you take a look at the provided instructions again?',
  'Go step-by-step through each one and verify that your previous response did in fact follow each instruction.',
  'If not every instruction was not followed exactly, please send a revised response where every instruction considered.',
  'Your response should be just the revised response and nothing else.',
].join('\n')

const improveResponseNoInstructions = [
  'Can you take a look at the provided instructions again?',
  'Please go step-by-step through your thinking of your previous response and consider whether you answered my question in full and truthfully. If not, please send a revised response.',
  'Your response should be just the revised response and nothing else.',
].join('\n')

const seniorDeveloperRole = [
  'You are a senior developer employed in a software company.',
  'Your task is to help me with my code.',
]

const refactorInstructions = [
  ...seniorDeveloperRole,
  '',
  'Instructions:',
  '- Refactor the provided code.',
  //
]

const npmPackageInstructions = [
  ...seniorDeveloperRole,
  '',
  'You are provided with a problem that I am hoping to discover an NPM (Node Package Manager) package that can help solve the problem.',
  '',
  'Your task is to recommend the three best NPM packages for the given problem.',
  'For each recommended package:',
  '- Describe in one sentence how the package solves the problem.',
  '- Provide a link to the package on NPM.',
  '- Provide a TypeScript code example of how to use the package.',
]

const tsInstructions = [
  ...seniorDeveloperRole,
  '',
  'My environment:',
  '- OS: ' + getOS(),
  '- IDE: Visual Studio Code',
  '- Language: TypeScript (nodejs)',
  '- Tools:',
  '  - NX mono-repository',
  '  - git and Github',
  '  - Jest testing framework',
  '',
  'When your response is code or a step by step guide, do not explain too much, just provide the code or steps.',
]

const javaInstructions = [
  ...seniorDeveloperRole,
  '',
  'My environment:',
  '- OS: ' + getOS(),
  '- IDE: Visual Studio Code',
  '- Language: Java (JDK 18)',
  '- Tools:',
  '  - Gradle',
  '  - Maven',
  '',
  'When your response is code or a step by step guide, do not explain too much, just provide the code or steps.',
]

const typedocInstructionsFunction = [
  ...seniorDeveloperRole,
  '',
  'Instructions:',
  '- You will be given some TypeScript code. Write TSDoc block comments for any functions in the code.',
  '- All relevant TSDoc tags should be included.',
  '- When TSDoc block comments already exist, do not remove or replace any of its TSDoc tags, but please add any additional missing TSDoc tags that need to be documented. The description may also be expanded if it is not detailed enough.',
  '- This is TSDoc and not JSDoc, so many tags are not needed because the tsdoc parser will infer them. Do not include these.',
  '- Respond with only the TSDoc comment.',
  '- Please be thorough and add as much documentation as you can, as long as it is relevant.',
  '- Do not write comments inside of a method or function body.',
  '- Do not insert types in braces or default values in brackets. This is TSDoc for TypeScript, so these can be inferred.',
]

const typedocInstructionsClass = [
  ...seniorDeveloperRole,
  '',
  'Instructions:',
  '- You will be given some TypeScript code. Write TSDoc block comments for the class, including a TSDoc block comment for every property and method.',
  '- Ensure TSDoc block comments exist for both public, protected and private class members.',
  '- All relevant TSDoc tags should be included.',
  '- When TSDoc block comments already exist, do not remove or replace any of its TSDoc tags, but please add any additional missing TSDoc tags that need to be documented. The description may also be expanded if it is not detailed enough.',
  '- This is TSDoc and not JSDoc, so many tags are not needed because the tsdoc parser will infer them. Do not include these.',
  '- In your response, write out all the code you were given without any modifications, just adding in the TSDoc comments. This makes it easier to copy and paste afterwards.',
  '- Please be thorough and add as much documentation as you can, as long as it is relevant.',
  '- Do not insert types in braces or default values in brackets. This is TSDoc for TypeScript, so these can be inferred.',
]

const tstestInstructions = [
  'You are a helpful assistant who writes unit tests for TypeScript code.',
  '',
  'Instructions:',
  '- Use the Jest testing framework, ie. "describe" and "it".',
  '- For for each public method in the the exported class, follow every possible code path step-by-step and then write tests for every code path, edge case or scenario that you find.',
  '- Create several tests for every function and every public class method.',
  '- It is important that you also write additional tests for the code paths where Errors are thrown.',
  '- In the test code, do not EVER use multi-line string aka. template literals in the code. To create multi-line strings, use instead string arrays representing each line of the string.',
  '- Write as many tests as needed to achieve a 95% code coverage minimum.',
  '- Please finish implementation of each test and do not leave things yet to be completed.',
  '- Your response should be only the TypeScript code for the tests and nothing else.',
]

export const presetDefaults = {
  default_preferGpt4: {
    description:
      'Whether to use GPT-4 whenever possible. If your openai account does not have access to GPT-4, set this to false. Please note that the response time is much much higher for GPT-4.',
    default: false,
    parse: parseBoolean,
    validate: validateBoolean,
  },

  default_temperature: {
    description: 'The temperature setting to use when using the OpenAI API.',
    default: 0.5,
    parse: parseNumber,
    validate: validateNumber,
  },

  default_terminalOutput: {
    description: 'Whether to output responses in the terminal.',
    default: true,
    parse: parseBoolean,
    validate: validateBoolean,
  },

  default_markdownOutput: {
    description: 'Whether to output responses as a markdown document.',
    default: true,
    parse: parseBoolean,
    validate: validateBoolean,
  },

  default_openResponseIn: {
    description:
      'Application launch command for the program to open the returned response in. Enter "none" to disable. If your browser cannot render markdown, you can install one of the many Markdown Viewer extensions. For Google Chrome, I can recommend "Markdown Viewer" (https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk). In the extension options, enable the "allow access to file URLs"-option and you are all set.',
    default:
      getOS() === 'windows'
        ? 'start msedge'
        : getOS() === 'osx'
        ? 'open -a "Safari"'
        : isLinuxProgramInstalled('google-chrome')
        ? 'google-chrome'
        : 'firefox',
    parse: parseString,
    validate: validateString,
  },

  default_maxExpectedResponseTokens: {
    description: 'The expected size of responses in tokens. One token is approximately equivalent to one character.',
    default: 2500,
    parse: parseInteger,
    validate: validateInteger,
  },

  default_inputTokensResponseTokensScalar: {
    description:
      'Add a fraction of the prompt input tokens to the max expected number of response tokens. ' +
      'For example, "0" means none are added, and "0.5" means add half the number of prompt input tokens.',
    default: 0,
    parse: parseNumber,
    validate: validateNumber,
  },

  default_improveResponse: {
    description: 'The exact phrasing for asking ChatGPT to improve its previous response.',
    default: improveResponse,
    parse: parseString,
    validate: validateString,
  },

  default_model: {
    description:
      'Always use a specific ai model. No value means automatic selection. Setting this setting overrides the "preferGpt4" setting.',
    default: '',
    parse: parseString,
    validate: validateStringType,
  },
}

const presetExamples = {
  q: {
    description: 'Prompt the plain ChatGPT with everything at default settings.',
    systemMessage: [],
    temperature: 1,
    improveReponse: improveResponseNoInstructions,
  },

  EN: {
    description: 'Translate text to English language.',
    systemMessage: ['Translate the given text into English.'],
    openResponseIn: 'none',
    terminalOutput: true,
    markdownOutput: false,
    maxExpectedResponseTokens: 0,
    inputTokensResponseTokensScalar: 1.5,
    improveResponse: 'Please verify whether your reponse was correct. If not, plaese send a revised response.',
  },

  DK: {
    description: 'Translate text to Danish language.',
    systemMessage: ['Translate the given text into Danish.'],
    openResponseIn: 'none',
    terminalOutput: true,
    markdownOutput: false,
    maxExpectedResponseTokens: 0,
    inputTokensResponseTokensScalar: 1.5,
    improveResponse: 'Please verify whether your reponse was correct. If not, plaese send a revised response.',
  },

  refactor: {
    description: 'Refactor code.',
    temperature: 0,
    systemMessage: refactorInstructions,
    maxExpectedResponseTokens: 0,
    inputTokensResponseTokensScalar: 1.5,
  },

  java: {
    description: 'Get help with Java code.',
    temperature: 0.3,
    systemMessage: javaInstructions,
  },

  ts: {
    description: 'Get help with TypeScript code.',
    temperature: 0.3,
    systemMessage: tsInstructions,
  },

  npm: {
    description: 'Get NPM package recommendations for a given problem.',
    temperature: 0.3,
    systemMessage: npmPackageInstructions,
  },

  tsdocf: {
    description: 'Generate TSDoc documentation for a function.',
    temperature: 0,
    systemMessage: typedocInstructionsFunction,
    maxExpectedResponseTokens: 100,
    inputTokensResponseTokensScalar: 1.5,
  },

  tsdocc: {
    description: 'Generate TSDoc documentation for a class.',
    temperature: 0,
    systemMessage: typedocInstructionsClass,
    model: 'gpt-3.5-turbo-16k',
  },

  tstest: {
    description: 'Generate TypeScript unit tests.',
    temperature: 0,
    systemMessage: tstestInstructions,
    model: 'gpt-3.5-turbo-16k',
  },
}

export const presetsConfig = {
  ...presetDefaults,

  presets_examples: {
    description: 'Example presets. Remove any that are not wanted.',
    default: presetExamples,
    parse: parseJsonObject<IGptPreset>,
    validate: validatePreset,
  },

  presets: {
    description:
      'Your custom presets. These presets define what commands are available. Add as many presets as you like.',
    default: {},
    parse: parseJsonObject<IGptPreset>,
    validate: validatePreset,
  },
}

function validatePreset(name: string, presets: Record<string, IGptPreset>): void {
  for (const [setting, pre] of Object.entries(presets as Record<string, IGptPreset>)) {
    const id = name + '.' + setting
    if (isDef(pre.description)) validateString(id + '.description', pre.description)
    if (isDef(pre.systemMessage)) validateStringArray(id + '.systemMessage', pre.systemMessage)
    if (isDef(pre.preferGpt4)) validateBoolean(id + '.preferGpt4', pre.preferGpt4)
    if (isDef(pre.temperature)) validateNumber(id + '.temperature', pre.temperature)
    if (isDef(pre.terminalOutput)) validateBoolean(id + '.terminalOutput', pre.terminalOutput)
    if (isDef(pre.markdownOutput)) validateBoolean(id + '.markdownOutput', pre.markdownOutput)
    if (isDef(pre.openResponseIn)) validateString(id + '.openResponseIn', pre.openResponseIn)
    if (isDef(pre.maxExpectedResponseTokens))
      validateInteger(id + '.maxExpectedResponseTokens', pre.maxExpectedResponseTokens)
    if (isDef(pre.inputTokensResponseTokensScalar))
      validateNumber(id + '.inputTokensResponseTokensScalar', pre.inputTokensResponseTokensScalar)
    if (isDef(pre.improveResponse)) validateString(id + '.improveResponse', pre.improveResponse)
    if (isDef(pre.model)) validateString(id + '.model', pre.model)
  }
}

function isDef<T>(value: T | undefined): value is T {
  return value !== undefined
}

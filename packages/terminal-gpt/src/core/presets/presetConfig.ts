import {
  parseBoolean,
  parseInteger,
  parseNumber,
  parseString,
  validateBoolean,
  validateInteger,
  validateNumber,
  validateString,
  validateStringArray,
} from '@bemoje/commander-config'
import { IGptPreset } from '../types/IGptPreset'

const improveResponse = [
  'Can you take a look at the provided instructions again? Go step-by-step through each one and verify that your previous response did in fact follow each instruction.',
  'If each instruction was followed, simply reply "No revisions."',
  'If each instruction was not followed, please send a revised response where every instruction is followed. In this case, your response should be just the revised response and nothing else.',
].join('\n')

const seniorDeveloperRole = ['You are a senior developer employed in a software company.']

const refactorInstructions = [
  ...seniorDeveloperRole,
  '',
  'Instructions:',
  '- Refactor the code that is given to you.',
  //
]

const tsInstructions = [
  ...seniorDeveloperRole,
  '',
  'My setup:',
  '- nodejs.',
  '- NX mono-repo.',
  '- Language: TypeScript.',
  '- Visual Studio Code.',
  '- git',
  '- Github',
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
  '- Do not insert types in braces or default values in brackets. This is TSDoc for TypeScript, so it is not needed.',
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
  '- Do not insert types in braces or default values in brackets. This is TSDoc for TypeScript, so it is not needed.',
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

const defaultInfo = ' All presets default to this setting when not configured.'

export const presetsConfig = {
  presets_temperature: {
    description: 'the temperature setting to use when using the OpenAI API.' + defaultInfo,
    default: 0.5,
    parse: parseNumber,
    validate: validateNumber,
  },

  presets_terminalOutput: {
    description: 'whether to output responses in the terminal.' + defaultInfo,
    default: true,
    parse: parseBoolean,
    validate: validateBoolean,
  },

  presets_markdownOutput: {
    description: 'whether to output responses as a markdown document.' + defaultInfo,
    default: true,
    parse: parseBoolean,
    validate: validateBoolean,
  },

  presets_openResponseIn: {
    description:
      'application launch command for the program to open the returned response in. If your browser cannot render markdown, you can install one of the many Markdown Viewer extensions.' +
      defaultInfo,
    default: 'chrome',
    parse: parseString,
    validate: validateString,
  },

  presets_maxExpectedResponseTokens: {
    description:
      'the expected size of responses in tokens. One token is approximately equivalent to one character.' + defaultInfo,
    default: 2500,
    parse: parseInteger,
    validate: validateInteger,
  },

  presets_improveResponse: {
    description: 'the exact phrasing for asking ChatGPT to improve its previous response.' + defaultInfo,
    default: improveResponse,
    parse: parseString,
    validate: validateString,
  },

  presets: {
    description: 'the presets are what defines what commands are available. Add or remove as many presets as you like.',
    default: {
      q: {
        description: 'ask any question. This is the plain ChatGPT as this has no configuration.',
        systemMessage: ['You are a helpful assistant.'],
      },

      refactor: {
        description: 'refactor code.',
        temperature: 0,
        systemMessage: refactorInstructions,
      },

      ts: {
        description: 'get help with TypeScript.',
        temperature: 0.3,
        systemMessage: tsInstructions,
      },

      tsdocf: {
        description: 'generate TSDoc documentation for a single function.',
        temperature: 0.2,
        systemMessage: typedocInstructionsFunction,
        maxExpectedResponseTokens: 4000,
      },

      tsdocc: {
        description: 'generate TSDoc documentation for a single class.',
        temperature: 0.2,
        systemMessage: typedocInstructionsClass,
        maxExpectedResponseTokens: 4000,
      },

      tstest: {
        description: 'generate TypeScript unit tests.',
        temperature: 0,
        systemMessage: tstestInstructions,
        maxExpectedResponseTokens: 8000,
      },
    },
    parse: (json: string) => {
      return JSON.parse(json) as Record<string, IGptPreset>
    },

    validate: (name: string, pres: Record<string, IGptPreset>) => {
      for (const [name, o] of Object.entries(pres as Record<string, IGptPreset>)) {
        if (o.description !== undefined) validateString(name, o.description)
        if (o.systemMessage !== undefined) validateStringArray(name, o.systemMessage)
        if (o.temperature !== undefined) validateNumber(name, o.temperature)
        if (o.terminalOutput !== undefined) validateBoolean(name, o.terminalOutput)
        if (o.markdownOutput !== undefined) validateBoolean(name, o.markdownOutput)
        if (o.openResponseIn !== undefined) validateString(name, o.openResponseIn)
        if (o.maxExpectedResponseTokens !== undefined) validateInteger(name, o.maxExpectedResponseTokens)
        if (o.improveResponse !== undefined) validateString(name, o.improveResponse)
      }
    },
  },
}

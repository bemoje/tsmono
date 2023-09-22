import { Config, parseString, validateString } from '@bemoje/commander-config'

export const config = new Config('bemoje', 'repoman', {
  repoRootDirectory: {
    description: 'The path to the root directory of your repositories.',
    default: process.cwd(),
    parse: parseString,
    validate: validateString,
  },
})

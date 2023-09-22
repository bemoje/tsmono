import { Config, parseString, validateDirpath, validateString } from '@bemoje/commander-config'

export const config = new Config('bemoje', 'open-repo', {
  rootdir: {
    description: 'An absolute path to the directory that contains your repositories.',
    default: '',
    parse: parseString,
    validate: validateDirpath,
  },
  IDE: {
    description:
      'The command to open your IDE. It is assumed that your IDE will open the directory passed to it as an argument.',
    default: 'code',
    parse: parseString,
    validate: validateString,
  },
})

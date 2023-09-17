import {
  Config,
  parseBoolean,
  parseDirectories,
  parseInteger,
  parseJson,
  validateBoolean,
  validateInteger,
  validateStringArray,
} from '@bemoje/commander-config'
import { getDiskDrivesWindows, getRootDir, isLinux, isOSX, isWindows } from '@bemoje/util'
import { wipeIndex } from './wipeIndex'

export const config = new Config('bemoje', 'bfind', {
  'print-scan-errors': {
    description: [
      'Whether to print errors when scans of files or directories fail.',
      'Reasons could be permission denied or other errors.',
      'This is disabled by default because it can be noisy.',
    ].join(' '),
    default: false,
    parse: parseBoolean,
    validate: validateBoolean,
  },
  'print-scan-ignored': {
    description: [
      'Whether to print when files or directories are skipped during scan.',
      'The user config controls what to ignore/skip.',
    ].join(' '),
    default: true,
    parse: parseBoolean,
    validate: validateBoolean,
  },
  'max-results': {
    description: ['The maximum number of search results to display. Set to zero to disable.'].join(' '),
    default: 35,
    parse: parseInteger,
    validate: validateInteger,
  },
  rootdirs: {
    description: [
      'The root directories which should be indexed for search.',
      'Use comma-separated values to specify multiple directories.',
    ].join(' '),
    default: isWindows()
      ? getDiskDrivesWindows()
      : isLinux()
      ? ['/media', '/usr', '/home', '/opt']
      : isOSX()
      ? ['/Users', '/Applications']
      : [getRootDir()],
    parse: (string: string) => {
      const res = parseDirectories(string)
      wipeIndex()
      return res
    },
    validate: validateStringArray,
  },
  ignore: {
    description: [
      'Path glob patterns to ignore when indexing.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    default: [
      '*/node_modules',
      '*/.*',
      '*/coverage',
      '*/docs',
      '*/doc',
      '*/cache',
      '*/dist',
      ...(!isWindows()
        ? []
        : [
            '*:/$recycle.bin',
            '*:/Windows',
            '*:/Drivers',
            '*:/Program Files',
            '*:/Program Files (x86)',
            '*:/ProgramData',
            '*:/Documents and Settings',
            '*:/System Volume Information',
            '*:/Recovery',
            '*:/Users/*/AppData',
            '*:/Users/*/Application Data',
          ]),
    ],
    parse: (json: string) => {
      const arr = parseJson(json)
      wipeIndex()
      return arr
    },
    validate: validateStringArray,
  },
  'case-insensitive': {
    description: ['Whether to ignore case when indexing.'].join(' '),
    default: isWindows(),
    parse: parseBoolean,
    validate: validateBoolean,
  },
})

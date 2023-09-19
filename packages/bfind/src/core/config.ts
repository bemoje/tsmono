import {
  Config,
  parseBoolean,
  parseInteger,
  parseJsonArray,
  validateBoolean,
  validateDirpaths,
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
    default: true,
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
    default: 50,
    parse: parseInteger,
    validate: validateInteger,
  },
  rootdirs: {
    description: [
      'The root directories which should be indexed for search.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    default: isWindows()
      ? getDiskDrivesWindows()
      : isLinux()
      ? ['/media', '/usr', '/home']
      : isOSX()
      ? ['/Users', '/Applications']
      : [getRootDir()],
    parse: (string: string) => {
      const res = parseJsonArray(string)
      wipeIndex()
      return res
    },
    validate: validateDirpaths,
  },
  ignore: {
    description: [
      'Directory path regex to ignore when indexing.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    default: [
      '\\/\\.',
      '\\/node_modules$',
      '\\/coverage$',
      '\\/docs$',
      '\\/doc$',
      '\\/cache$',
      '\\/dist$',
      ...(!isWindows()
        ? []
        : [
            '^\\w://\\$recycle\\.bin',
            '^\\w://Windows',
            '^\\w://Program Files',
            '^\\w://ProgramData',
            '^\\w://Documents and Settings',
            '^\\w://System Volume Information',
            '^\\w://Recovery',
            '^\\w://Users\\/All Users',
            '^\\w://Users\\/Public',
            '^\\w://Users\\/Default( User)?',
            '^\\w://Users\\/\\w+\\/Documents\\/My',
            '^\\w://Users\\/\\.*\\/AppData$',
            '^\\w://Users\\/\\.*\\/Application Data$',
          ]),
    ],
    parse: (json: string) => {
      const arr = parseJsonArray(json)
      wipeIndex()
      return arr
    },
    validate: validateStringArray,
  },
  'ignore-files': {
    description: [
      'File path regex to ignore when indexing.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    default: [],
    parse: (json: string) => {
      const arr = parseJsonArray(json)
      wipeIndex()
      return arr
    },
    validate: validateStringArray,
  },
  'case-insensitive': {
    description: ['Whether to ignore case when indexing.'].join(' '),
    default: isWindows(),
    parse: (string: string) => {
      const bool = parseBoolean(string)
      wipeIndex()
      return bool
    },
    validate: validateBoolean,
  },
})

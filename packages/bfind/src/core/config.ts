import {
  Config,
  parseBoolean,
  parseDirectories,
  parseInteger,
  validateBoolean,
  validateInteger,
  validateStringArray,
} from '@bemoje/commander-config'
import { getDiskDrivesWindows, getRootDir, isWindows } from '@bemoje/util'
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
      'Use comma as separator for multiple directories.',
    ].join(' '),
    default: isWindows() ? getDiskDrivesWindows() : [getRootDir()],
    parse: (string: string) => {
      const res = parseDirectories(string)
      wipeIndex()
      return res
    },
    validate: validateStringArray,
  },
  ignore: {
    description:
      'Directories to ignore/skip when scanning (regex mode). Use semicolon as separator for multiple expressions.',
    default: [
      '^\\w:\\/\\$recycle\\.bin',
      '^\\w:\\/windows',
      '^\\w:\\/Program Files',
      '^\\w:\\/ProgramData',
      '^\\w:\\/Documents and Settings',
      '^\\w:\\/System Volume Information',
      '^\\w:\\/Recovery',
      '^\\w:\\/Users\\/All Users',
      '^\\w:\\/Users\\/Public',
      '^\\w:\\/Users\\/Default( User)?',
      '^\\w:\\/Users\\/\\w+\\/Documents\\/My',
      '\\/node_modules$',
      '\\/AppData$',
      '\\/Application Data$',
      '\\/\\.',
    ],
    parse: (string: string): string[] => {
      const arr = string.split(',').map((d) => d.trim())
      wipeIndex()
      return arr
    },
    validate: validateStringArray,
  },
})

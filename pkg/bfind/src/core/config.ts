import { Config, parseBoolean, parseDirectories, parseInteger } from '@bemoje/commander-config'
import { getDiskDrivesWindows, getRootDir, isWindows } from '@bemoje/fs'
import { wipeIndex } from './wipeIndex'

// import { parseBoolean } from './core/parseBoolean'
// import { parseDirectories } from './core/parseDirectories'
// import { parseInteger } from './core/parseInteger'
export const config = new Config('bemoje', 'bfind', {
  'print-scan-errors': {
    description: [
      'Whether to print errors when scans of files or directories fail.',
      'Reasons could be permission denied or other errors.',
    ].join(' '),
    default: true,
    required: false,
    parse: parseBoolean,
  },
  'print-scan-ignored': {
    description: [
      'Whether to print when files or directories are skipped during scan.',
      'This is controlled by the user settings for what to ignore/skip.',
    ].join(' '),
    default: true,
    required: false,
    parse: parseBoolean,
  },
  'max-results': {
    description: ['The maximum number of search results to display.'].join(' '),
    default: 35,
    required: true,
    parse: parseInteger,
  },
  'rootdirs': {
    description: [
      'The root directories which should be indexed for search.',
      'Use semicolon as separator for multiple directories.',
    ].join(' '),
    default: isWindows() ? getDiskDrivesWindows() : [getRootDir()],
    required: true,
    parse: (string: string) => {
      const res = parseDirectories(string)
      wipeIndex()
      return res
    },
  },
  'ignore': {
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
    required: true,
    parse: (string: string): string[] => {
      const arr = string.split(';').map((d) => d.trim())
      wipeIndex()
      return arr
    },
  },
})

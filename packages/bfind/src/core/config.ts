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
import { wipeIndex } from '../util/wipeIndex'

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
    default: false,
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
  'ignore-dirpaths': {
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
            '^\\w:\\/\\$Recycle\\.Bin$',
            '^\\w:\\/Windows\\/[^sS]',
            // '^\\w:/Windows\\/System32\\/.',
            // '^\\w:/Program Files',
            '^\\w:\\/ProgramData$',
            // '^\\w:/Documents and Settings$',
            '^\\w:\\/System Volume Information$',
            '^\\w:\\/Recovery$',
            // '^\\w:/Users\\/All Users$',
            // '^\\w:/Users\\/Public$',
            // '^\\w:/Users\\/Default',
            // '^\\w:/Users\\/\\w+\\/Documents\\/My \\w+$',
            '^\\w:\\/Users\\/\\w+\\/AppData$',
            '^\\w:\\/Users\\/\\w+\\/Application Data$',
          ]),
    ],
    parse: (json: string) => {
      const arr = parseJsonArray(json)
      wipeIndex()
      return arr
    },
    validate: validateStringArray,
  },
  'ignore-filepaths': {
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
  'ignore-file-extensions': {
    description: [
      'File extensions to ignore when indexing.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    default: [
      'tfm',
      'vf',
      'peak',
      'reapeaks',
      'rpp-bak',
      'htf',
      'pfb',
      'cdf-ms',
      'mkii',
      'manifest',
      'lbx',
      'eps',
      'pyc',
      'tikz',
      'pfm',
      'mui',
      'mkiv',
      'jar',
      'unity3d',
      'cat',
      'mf',
      'xrm-ms',
      'sty',
      'rst',
      'enc',
      'pak',
      'sip',
      'tff',
      'ttf',
      'tga',
      'etl',
      'bin',
      'inf',
      'bak',
      'inf_loc',
      'fd',
      'tlpobj',
      'afm',
      'dtx',
      'ini',
      'otf',
      'ins',
      'def',
      'dat',
      'map',
      'ldf',
      'cls',
    ],
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

import { buildIndex } from '../actions/buildIndex'
import { CLI } from '@bemoje/cli'
import {
  getDiskDrivesWindows,
  isBoolean,
  isInteger,
  isLinux,
  isOSX,
  isStringArray,
  isWindows,
  parseBoolean,
  parseInteger,
  pathRoot,
} from '@bemoje/util'
import { search } from '../actions/search'
import { wipeIndex } from '../util/lib/wipeIndex'

export const bfind = CLI('bfind', (c) => {
  c.version('0.0.0')
  c.description(
    [
      'Fast (instantaneous) file search anywhere in your system.',
      'Directories are highlighted in cyan color in the search results.',
      'The search results are sorted by their last modified date.',
      'Regex ignore patterns are configurable in CLI or the JSON config file.',
      'Contents of files are not indexed/searchable - only the paths to the files.',
    ].join(' ')
  )
  c.enableBuiltinOptions()
  c.presetsEnabled(true)

  c.command('search', (s) => {
    s.alias('s')
    s.description('Search the filesystem.')
    s.argument(
      '<searchTerms...>',
      'Each argument is a search term where all terms must match somewhere in a path to be included in the result.'
    )
    s.option('-f, --fileSearchTerms <terms...>', 'Search inside every file in the search result.')
    s.option('-d, --dir <dir>', (o) => {
      o.description('Limit search to a given directory. Overrides the --cwd option.')
      o.implies({ cwd: false })
    })
    s.option('-c, --cwd', 'Search only the current working directory.')
    s.option('-p, --pipe', 'Output only filepaths, no colors or other information.')
    s.option('-e, --extensions <exts...>', 'Include only files with provided file-extensions.')
    s.action(search)
    s.usageExamples(
      {
        command: 'bfind search index.ts',
        description: "Return a list of paths to all 'index.ts' files..",
      },
      {
        command: 'bfind search src index.ts',
        description: "Search for all paths that have 'src' and 'index.ts' somewhere in them.",
      }
    )
  })

  c.command('index', (s) => {
    s.alias('i')
    s.description('Update the search index of the filesystem.')
    s.action(buildIndex)
    s.usageExamples({
      command: 'bfind index',
      description: 'Scan and index all specified directories and files in the filesystem.',
    })
  })

  c.config('rootdirs', {
    description: [
      'The root directories which should be indexed for search.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    defaultValue: isWindows()
      ? getDiskDrivesWindows()
      : isLinux()
      ? ['/media', '/usr', '/home']
      : isOSX()
      ? ['/Users', '/Applications']
      : [pathRoot(process.cwd())],
    parse: (string: string) => {
      const res = JSON.parse(string) as string[]
      wipeIndex()
      return res
    },
    validate: isStringArray,
  })

  c.config('ignoreDirpaths', {
    description: [
      'Directory path regex to ignore when indexing.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    defaultValue: [
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
            // '^\\w:\\/Windows\\/[^sS]',
            '^\\w:\\/ProgramData$',
            '^\\w:\\/System Volume Information$',
            '^\\w:\\/Recovery$',
            '^\\w:\\/Users\\/\\w+\\/AppData$',
            '^\\w:\\/Users\\/\\w+\\/Application Data$',
          ]),
    ],
    parse: (json: string) => {
      const arr = JSON.parse(json) as string[]
      wipeIndex()
      return arr
    },
    validate: isStringArray,
  })

  c.config('ignoreFilepaths', {
    description: [
      'File path regex to ignore when indexing.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    defaultValue: [],
    parse: (json: string) => {
      const arr = JSON.parse(json) as string[]
      wipeIndex()
      return arr
    },
    validate: isStringArray,
  })

  c.config('ignoreFileExtensions', {
    description: [
      'File extension regex to ignore when indexing.',
      'Input a valid JSON string array. You might prefer to use "bfind config" to edit this in a text editor.',
    ].join(' '),
    defaultValue: [
      '.tfm',
      '.vf',
      '.peak',
      '.reapeaks',
      '.rpp-bak',
      '.htf',
      '.pfb',
      '.cdf-ms',
      '.mkii',
      '.manifest',
      '.lbx',
      '.eps',
      '.pyc',
      '.tikz',
      '.pfm',
      '.pyi',
      '.mui',
      '.mkiv',
      '.jar',
      '.unity3d',
      '.cat',
      '.mf',
      '.xrm-ms',
      '.sty',
      '.rst',
      '.enc',
      '.pak',
      '.sip',
      '.tff',
      '.ttf',
      '.mum',
      '.tga',
      '.wmf',
      '.etl',
      '.bin',
      '.dll',
      '.inf',
      '.bak',
      '.inf_loc',
      '.fd',
      '.tlpobj',
      '.afm',
      '.dtx',
      '.ini',
      '.otf',
      '.ins',
      '.def',
      '.dat',
      '.map',
      '.ldf',
      '.cls',
    ],
    parse: (json: string) => {
      const arr = JSON.parse(json) as string[]
      wipeIndex()
      return arr
    },
    validate: isStringArray,
  })

  c.config('caseInsensitive', {
    description: 'Whether or not to ignore case when searching.',
    defaultValue: true,
    parse: parseBoolean,
    validate: isBoolean,
  })

  c.config('printScanErrors', {
    description: [
      'Whether to print errors when scans of files or directories fail.',
      'Reasons could be permission denied or other errors.',
      'This is disabled by default because it can be noisy.',
    ].join(' '),
    defaultValue: false,
    parse: parseBoolean,
    validate: isBoolean,
  })

  c.config('printScanIgnored', {
    description: [
      'Whether to print when files or directories are skipped during scan.',
      'The user config controls what to ignore/skip.',
    ].join(' '),
    defaultValue: false,
    parse: parseBoolean,
    validate: isBoolean,
  })

  c.config('maxResults', {
    description: 'The maximum number of search results to display. Set to zero to disable.',
    defaultValue: 25,
    parse: parseInteger,
    validate: isInteger,
  })
})

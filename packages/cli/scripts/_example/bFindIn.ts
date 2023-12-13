import { CLI } from '../../src/cmd/CLI'
import { execInherit } from '../../src/util/node/execInherit'
import { printCounts } from '../../src/core/counter'
import { strSplitCamelCase } from '../../src/util/string/strSplitCamelCase'

console.time('load')

const init = CLI('bFindIn', (b) => {
  b.setRecommended()
  b.version('0.0.1')
  b.description(
    [
      "Search for 'PATTERN' inside files in 'DIRPATH'.",
      '  Can search inside zip and binary files - and more.',
      '',
      "This is a wrapper for 'ag' which needs to be installed.",
      '  https://github.com/JFLarvoire/the_silver_searcher',
      '',
      'Example Usage:',
      `  ${b.name} matches keyword ./src`,
      `  ${b.name} paths keyword --depth=1`,
      `  ${b.name} file keyword readme.md --ignore-case`,
    ].join('\n')
  )

  b.argument('<pattern>', 'search pattern')
  b.argument('[dirpath]', 'dirpath to search')
  // pattern settings
  b.option('-i, --ignore-case', 'Case-insensitive')
  b.option('-s, --case-sensitive', 'Case-sensitive.')
  b.option('-Q, --literal', 'Do not parse PATTERN as a regular expression')
  b.option('-m, --max-count <NUM>', (o) => {
    o.description('Skip the rest of a file after NUM matches.')
    o.parser.integer()
    o.default(10000)
  })
  b.option('-w, --word-regexp', 'Only match whole words')
  b.option('--invert-match', 'Match anything except PATTERN')
  // navigation patterns
  b.option('--ignore <names>', (o) => {
    o.description('Comma-delimited list of dirnames to ignore')
    o.parser.delimitedStrings(',')
  })
  b.option('-U, --skip-vcs-ignores', 'Ignore VCS ignore files (.gitignore, .hgignore; still obey .ignore)')
  // directory selection
  b.option('--depth <n>', (o) => {
    o.description('Max directory depth.')
    o.parser.integer()
    o.default(25)
  })
  b.option('-f, --follow', 'Follow symlinks')
  b.option('--one-device', 'Do not follow links to other devices.')
  b.option('--path-to-ignore <PATH>', 'Filepath to file with paths to ignore.')
  // file selection
  b.option(
    '-u, --unrestricted',
    'Search all files (ignore .ignore, .gitignore, etc.; searches binary and hidden files as well).'
  )
  b.option(
    '-z, --search-zip',
    'Search contents of compressed (e.g., gzip) files. Note that Windows zip files are not supported.'
  )
  b.option('-a, --all-types', 'Search all files (does not include hidden files or patterns from ignore files)')
  b.option('-t, --all-text', 'Search all text files (does not include hidden files)')
  b.option('--ext <file-extensions>', (o) => {
    o.description('Comma-delimited list of file extensions to include.')
    o.parser.custom((string: string) => {
      const arr = string
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      if (arr.length === 1) return '"\\.' + arr[0] + '$"'
      return '"\\.(' + arr.join('|') + ')$"'
    })
  })
  // output modes
  b.option('--files-with-matches', 'Only print filenames that contain matches (do not print the matching lines)')
  b.option('--silent', 'Suppress all log messages, including errors')
  b.option('--stats', 'Print stats (files scanned, time taken, etc.)')
  b.option('--stats-only', 'Print stats and nothing else.')
  // context
  b.option('-B, --before <lines>', (o) => {
    o.description('Print lines before match')
    o.default(0)
    o.parser.integer()
  })
  b.option('-A, --after <lines>', (o) => {
    o.description('Print lines after match')
    o.default(0)
    o.parser.integer()
  })
  b.option('--nobreak', 'Disable printing newlines between matches in different files')
  b.option('-W, --width <n>', (o) => {
    o.description('Truncate match lines after n characters.')
    o.parser.integer()
  })
  b.option('--column', 'Print column numbers in results')
  b.option('--nonumbers', 'Print line numbers. Default is to omit line numbers when searching streams')
  b.option('--filename', 'Print file names (Enabled unless searching a single file)')
  b.option('--print-all-files', 'Print headings for all files searched, even those that do not contain matches')
  b.option('-o, --only-matching', 'Prints only the matching part of the lines')
  b.option('--print-long-lines', 'Print matches on very long lines (Default: >2k characters)')
  b.option('-C, --context <lines>', (o) => {
    o.description('Print lines before and after matches')
    o.default(0)
    o.parser.integer()
  })
  b.option('-H, --noheading', "Disable printing file names before each file's matches")
  b.option('-c, --count', 'Only print file match counts. (Not always equal to matching lines count)')
  // misc
  b.option('-g, --filename-pattern <pattern>', 'Print filenames matching PATTERN')
  b.option('-L, --files-without-matches', 'Only print filenames that do not contain matches')
  b.option('--passthrough', 'When searching a stream, print all lines even if they do not match')
  b.option('-0, --print0', "Separate filenames with null (for 'xargs -0')")
  b.option('--ackmate', 'Print results in AckMate-parseable format')
  b.option('--vimgrep', 'Print results like :vimgrep /pattern/g would in vim (reports every line match)')
  // teminal colors
  b.option('--nocolor', 'Disable printing color codes in results')
  b.option('--color-line-number <cc>', (o) => {
    o.description('Color codes for line numbers')
    o.default('1;33')
  })
  b.option('--color-match <cc>', (o) => {
    o.description('Color codes for result match numbers')
    o.default('30;43')
  })
  b.option('--color-path <cc>', (o) => {
    o.description('Color codes for path names')
    o.default('1;32')
  })
  b.option('--color-win-ansi', 'Always use ANSI colors in Windows (except pager/pipe remain ANSI)')

  ////////////////

  b.action(async (pattern, dirpath, opts) => {
    const args: string[] = []
    for (const [k, value] of Object.entries(opts)) {
      if (k === 'debug') continue
      let key = strSplitCamelCase(k)
        .map((s) => s.trim())
        .join('-')
        .toLowerCase()
      if (key === 'ext') key = 'file-search-regex'

      if (value == null || value === false) {
        continue
      }
      if (b.options.find((o) => o.attributeName() === k)?.defaultValue === value) {
        continue
      }
      if (value === true) {
        args.push(`--${key}`)
        continue
      }
      args.push(`--${key} "${value}"`)
    }
    const cmd = `ag ${args.join(' ')} ${pattern} ${dirpath || ''}`.trim()
    console.log({ pattern, dirpath, opts, cmd })
    await execInherit(cmd)
  })

  b.preset('#matches', {
    description: 'Print matches found in each file',
    options: { count: false, numbers: true, column: true, printLongLines: false, onlyMatching: true, width: 100 },
  })
  b.preset('#paths', {
    description: 'Print only paths to files with matches',
    options: { paths: true, maxCount: 1, silent: true },
  })
  b.preset('#bin', {
    description: 'Search everything, including zipped, binary, and hidden files.',
    options: {
      unrestricted: true,
      searchBinary: true,
      searchZip: true,
      hidden: true,
      printLongLines: true,
    },
  })
  b.preset('#text', {
    description: 'Search all text files.',
    options: {
      allText: true,
    },
  })
  b.preset('#ts', {
    description: 'Search source code in a js/ts repository.',
    args: [null, 'C:/Users/bemoj/repos'],
    options: {
      ext: '\\.(ts|tsx|json|js|jsx|md|css|html|txt)$',
      ignore: 'node_modules',
    },
  })

  ////////////////
})
console.timeEnd('load')

console.time('init')
const cli = init()
console.timeEnd('init')

console.time('exec')
cli.parse()
console.timeEnd('exec')

printCounts()

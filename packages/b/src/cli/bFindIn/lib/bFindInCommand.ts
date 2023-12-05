import path from 'path'
import { autoAssignMissingOptionFlags } from '../../../core/CommandBuilder/features/autoAssignMissingOptionFlags'
import { camelCaseOptionLongName } from '../../../core/util/camelCaseOptionLongName'
import { Command, OptionValues } from 'commander'
import { createPresetListCommand } from './core/preset/createPresetListCommand'
import { createPresets as createPresets } from './core/preset/createPresets'
import {
  execInherit,
  getTempDataPath,
  setNonEnumerable,
  strHashToStringDJB2,
  strWrapInDoubleQuotes,
  writeFileSafe,
} from '@bemoje/util'
import { getHomeDirectory } from '@bemoje/util'
import { IPresets } from '../../../types/IPresets'
import { Option } from 'commander'
import { parseNumber } from '../../../parsers/parseNumber'

export const PRESETS: IPresets<OptionValues> = {
  defaults: {
    name: 'defaults',
    description: 'All other presets inherit from this preset',
    args: ['', ''],
    options: {
      ignoreDirs: 'AppData,node_modules,coverage,docs,doc,cache,dist,logs',
      maxCount: 5,
      width: 120,
    },
  },
}

export function parsePathString(value: string) {
  return strWrapInDoubleQuotes(path.normalize(value.replace(/"/g, '')).replace(/\\/g, '/'))
}

/**
 * Create a CLI for the bFindIn program.
 */
export function bFindInCommand() {
  const HOMEDIR = path.normalize(getHomeDirectory()).replace(/\\/g, '/')
  const TEMPDIR = path.normalize(getTempDataPath('f')).replace(/\\/g, '/')
  const REPOSDIR = path.join(HOMEDIR, 'repos').replace(/\\/g, '/')

  const cmd = new Command('bFindIn')
  cmd.version('0.0.1')
  cmd.showHelpAfterError()
  cmd.allowExcessArguments(true)

  cmd.description(
    [
      'Recursively search for PATTERN inside files in PATH.',
      '  Can search inside zip and binary files.',
      '',
      'Examples:',
      `  ${cmd.name()} matches keyword ./src`,
      `  ${cmd.name()} paths keyword --depth=1`,
      `  ${cmd.name()} file keyword readme.md --ignore-case`,
      '',
      "This is a wrapper for 'ag' which has to be installed for this program to run.",
      '  https://github.com/JFLarvoire/the_silver_searcher',
    ].join('\n')
  )

  cmd.usage('[command] <pattern> [dirpath] [options]')
  cmd.argument('<pattern>', 'search pattern')
  cmd.argument('[dirpath]', 'dirpath to search', parsePathString)

  const defs = Object.assign(
    {
      maxCount: 10000,
      depth: 25,
      after: 0,
      before: 0,
      context: 0,
      nocolor: false,
      nobreak: false,
      noheading: false,
      colorLineNumber: '1;33',
      colorMatch: '30;43',
      colorPath: '1;32',
    },
    PRESETS.defaults.options
  )

  const opt = <T>(cmd: Command, flags: string, description: string, parse?: (value: string) => T): Option => {
    const opt = new Option(flags, description)
    const optName = opt.attributeName()
    if (parse) opt.argParser(parse)
    if (Object.hasOwn(defs, optName)) {
      opt.presetArg = defs[optName]
    }
    cmd.addOption(opt)
    return opt
  }

  // pattern settings
  opt(cmd, '-i, --ignore-case', 'Case-insensitive')
  opt(cmd, '-I, --case-sensitive', 'Case-sensitive.')
  opt(cmd, '-l, --literal', 'Do not parse PATTERN as a regular expression')
  opt(cmd, '-w, --word-regexp', 'Only match whole words')
  opt(cmd, '--invert-match', 'Match anything except PATTERN')
  // navigation patterns
  opt(cmd, '-D, --ignore-dirs <names>', 'Comma-delimited list of dirnames to ignore', parseCommaDelimitedString)
  opt(cmd, '--skip-vcs-ignores', 'Ignore VCS ignore files (.gitignore, .hgignore; still obey .ignore)')
  // directory selection
  opt(cmd, '-d, --depth <n>', 'Max directory depth.', parseNumber).preset(25)
  opt(cmd, '--follow', 'Follow symlinks')
  opt(cmd, '--one-device', 'Do not follow links to other devices.')
  // file selection
  opt(cmd, '-a, --all-types', 'Search all files (does not include hidden files or patterns from ignore files)')
  opt(cmd, '-t, --all-text', 'Search all text files (does not include hidden files)')
  opt(cmd, '-e, --ext <file-extensions>', 'Comma-delimited list of file extensions to include.', (string: string) => {
    const arr = parseCommaDelimitedString(string).split(',')
    if (arr.length === 1) return '"\\.' + arr[0] + '$"'
    return '"\\.(' + arr.join('|') + ')$"'
  })

  // file selection by special properties
  opt(cmd, '-h, --hidden', 'Search hidden files (obeys .*ignore files)')
  opt(cmd, '-b, --search-binary', 'Search binary files for matches')
  opt(cmd, '-z, --search-zip', 'Search contents of compressed files. Windows zip files are not supported.')
  opt(cmd, '-u, --unrestricted', 'Search all files, incl. binary and hidden (except .ignore, .gitignore, etc.)')
  // in-file behaviour
  opt(cmd, '-m, --max-count <n>', 'Skip the rest of a file after n matches', parseNumber)
    .preset(10000)
    .implies({ silent: true })
  // hidden
  opt(cmd, '--path-to-ignore <filepath>', 'Filepath to .ignore file', parseCommaDelimitedString).conflicts(
    'ignoreDirs'
  ).hidden = true
  opt(cmd, '--file-search-regex <pattern>', 'Limit search to filenames matching PATTERN').hidden = true

  // output modes
  opt(cmd, '-p, --paths', 'Only print filenames that contain matches (do not print the matching lines)').implies({
    filesWithMatches: true,
    maxCount: 1,
  })
  opt(cmd, '-s, --silent', 'Suppress all log messages, including errors')
  opt(cmd, '-S, --stats', 'Print stats (files scanned, time taken, etc.)')
  opt(cmd, '--stats-only', 'Print stats and nothing else.')
  opt(cmd, '-T, --trace', 'Dry-run and trace command calls (for debugging).')
  // context
  opt(cmd, '--after <lines>', 'Print lines after match', parseNumber).preset(0)
  opt(cmd, '--before <lines>', 'Print lines before match', parseNumber).preset(0)
  opt(cmd, '--nobreak', 'Disable printing newlines between matches in different files').negate = true
  opt(cmd, '--width <n>', 'Truncate match lines after n characters.', parseNumber)
  opt(cmd, '--column', 'Print column numbers in results')
  opt(cmd, '--numbers', 'Print line numbers. Default is to omit line numbers when searching streams')
  opt(cmd, '--filename', 'Print file names (Enabled unless searching a single file)')
  opt(cmd, '--print-all-files', 'Print headings for all files searched, even those that do not contain matches')
  opt(cmd, '--only-matching', 'Prints only the matching part of the lines')
  opt(cmd, '--print-long-lines', 'Print matches on very long lines (Default: >2k characters)')
  opt(cmd, '--context <lines>', 'Print lines before and after matches', parseNumber).preset(0)
  opt(cmd, '--noheading', "Disable printing file names before each file's matches").negate = true
  opt(cmd, '-C, --count', 'Only print file match counts. (Not always equal to matching lines count)')
  // misc
  opt(cmd, '--filename-pattern <pattern>', 'Print filenames matching PATTERN')
  opt(cmd, '--files-without-matches', 'Only print filenames that do not contain matches')
  opt(cmd, '--passthrough', 'When searching a stream, print all lines even if they do not match')
  opt(cmd, '--print0', "Separate filenames with null (for 'xargs -0')")
  opt(cmd, '--ackmate', 'Print results in AckMate-parseable format')
  opt(cmd, '--vimgrep', 'Print results like :vimgrep /pattern/g would in vim (reports every line match)')
  // teminal colors
  opt(cmd, '--nocolor', 'Disable printing color codes in results').negate = true
  opt(cmd, '--color-line-number <cc>', 'Color codes for line numbers').preset('1;33')
  opt(cmd, '--color-match <cc>', 'Color codes for result match numbers').preset('30;43')
  opt(cmd, '--color-path <cc>', 'Color codes for path names').preset('1;32')
  opt(cmd, '--color-win-ansi', 'Always use ANSI colors in Windows (except pager/pipe remain ANSI)')

  autoAssignMissingOptionFlags(cmd)

  cmd.action(async () => {
    const args = cmd.args.slice()
    const options = cmd.opts()
    const globals = cmd.optsWithGlobals()
    if (globals['trace']) console.log({ event: 'start', preset: cmd.name(), args, options })

    cmd.options.forEach((opt) => {
      const optName = camelCaseOptionLongName(opt.name())
      if (options[optName] !== undefined && options[optName] === opt.presetArg) {
        setNonEnumerable(options, optName)
        // delete options[optName]
      }
    })

    if (options['ext']) {
      options['fileSearchRegex'] = options['ext']
      setNonEnumerable(options, 'ext')
      // delete options['ext']
    }

    if (options['paths']) {
      options['filesWithMatches'] = true
      setNonEnumerable(options, 'paths')
      // delete options['paths']
    }

    if (options['ignoreDirs']) {
      const ignoreDirs = options['ignoreDirs'].replace(/"/g, '').split(',')
      const content = ignoreDirs.map((s: string) => s + '/').join('\n')
      const hash = Math.abs(strHashToStringDJB2(content)).toString()
      const tempFilePath = path.join(TEMPDIR, hash + '.txt').replace(/\\/g, '/')
      options['pathToIgnore'] = parsePathString(tempFilePath)
      await writeFileSafe(tempFilePath, content)
      setNonEnumerable(options, 'ignoreDirs')
      // delete options['ignoreDirs']
    }
    const oargs = optionsToCommandString_old(options)
    const arrCmd = [...args, ...oargs]
    const command = ['ag', ...arrCmd]

    try {
      if (globals['trace']) return console.log({ event: 'done', preset: cmd.name(), command })
      await execInherit(command.join(' '))
    } catch (error) {
      if (options['silent']) return
      else console.error(error instanceof Error ? error.message : String(error))
    }
  })

  createPresets(cmd, {
    matches: {
      description: 'Print matches found in each file',
      options: { count: false, numbers: true, column: true, printLongLines: false },
    },
    count: {
      description: 'Print only path and number of matches',
      options: { count: true },
    },
    paths: {
      description: 'Print only paths to files with matches',
      options: { paths: true, maxCount: 1, silent: true },
    },
    repos: {
      description: 'Search in the home directory',
      args: ['', strWrapInDoubleQuotes(REPOSDIR)],
    },
    binary: {
      description: 'Search everything, including zipped, binary, and hidden files.',
      options: {
        unrestricted: true,
        searchBinary: true,
        searchZip: true,
        hidden: true,
        printLongLines: true,
      },
    },
    text: {
      description: 'Search all text files.',
      options: {
        allText: true,
      },
    },
    ts: {
      description: 'Search source code in a js/ts repository.',
      options: {
        ext: 'ts,tsx,json,js,jsx,md,css,html,txt',
      },
    },
  })

  createPresetListCommand(cmd)

  return cmd
}

export function setOptions(cmd: Command) {
  return cmd
}

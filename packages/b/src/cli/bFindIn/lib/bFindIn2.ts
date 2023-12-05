import { CommandBuilder } from '../../../core/CommandBuilder/CommandBuilder'

console.time('init')

const cli = new CommandBuilder('bFindIn', (b) => {
  b.description(
    [
      'Recursively search for PATTERN inside files in PATH.',
      '  Can search inside zip and binary files.',
      '',
      'Examples:',
      `  ${b.name} matches keyword ./src`,
      `  ${b.name} paths keyword --depth=1`,
      `  ${b.name} file keyword readme.md --ignore-case`,
      '',
      "This is a wrapper for 'ag' which has to be installed for this program to run.",
      '  https://github.com/JFLarvoire/the_silver_searcher',
    ].join('\n')
  )
  b.version('0.0.0')

  b.features
    .upgradeHelp()
    .utils()
    .config()
    .presets()
    .checkForDublicateOptionNames()
    .autoAssignMissingOptionFlags()
    .autoAssignSubCommandAliases()

  b.argument('<pattern>', (a) => {
    a.description('search pattern')
  })
  b.argument('[dirpath]', (a) => {
    a.description('dirpath to search')
  })
  // pattern settings
  b.option('-i, --ignore-case', (o) => {
    o.description('Case-insensitive')
  })
  b.option('-I, --case-sensitive', (o) => {
    o.description('Case-sensitive.')
  })
  b.option('-l, --literal', (o) => {
    o.description('Do not parse PATTERN as a regular expression')
  })
  b.option('-w, --word-regexp', (o) => {
    o.description('Only match whole words')
  })
  b.option('--invert-match', (o) => {
    o.description('Match anything except PATTERN')
  })
  // navigation patterns
  b.option('-D, --ignore-dirs <names>', (o) => {
    o.description('Comma-delimited list of dirnames to ignore')
    o.parser.delimitedStrings(',')
  })
  b.option('--skip-vcs-ignores', (o) => {
    o.description('Ignore VCS ignore files (.gitignore, .hgignore; still obey .ignore)')
  })
  // directory selection
  b.option('-d, --depth <n>', (o) => {
    o.description('Max directory depth.')
    o.parser.integer()
    o.default(25)
  })
  b.option('--follow', (o) => {
    o.description('Follow symlinks')
  })
  b.option('--one-device', (o) => {
    o.description('Do not follow links to other devices.')
  })
  // file selection
  b.option('-a, --all-types', (o) => {
    o.description('Search all files (does not include hidden files or patterns from ignore files)')
  })
  b.option('-t, --all-text', (o) => {
    o.description('Search all text files (does not include hidden files)')
  })
  b.option('-e, --ext <file-extensions>', (o) => {
    o.description('Comma-delimited list of file extensions to include.')
  })
})

const main = cli.getExports()
console.timeEnd('init')

///////////////////
console.time('execution')
main()
  .then(() => {
    console.timeEnd('execution')
  })
  .catch(console.error)

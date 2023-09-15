import { Config, parseString, validateString } from '@bemoje/commander-config'
import { colors, execute, getAppDataPath } from '@bemoje/util'
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import { createCommand } from './createCommand'
import { build } from './lib/build'
import { createPackage } from './lib/createPackage'
import { deletePackage } from './lib/deletePackage'
import { docs } from './lib/docs'
import { fixAll } from './lib/fixAll'
import { forEach } from './lib/forEach'
import { lint } from './lib/lint'
import { openCoverage } from './lib/openCoverage'
import { openDocs } from './lib/openDocs'
import { packageDependencies } from './lib/packageDependencies'
import { prepub } from './lib/prepub'
import { publish } from './lib/publish'
import { rehash } from './lib/rehash'
import { testdir } from './lib/testdir'
import { testfile } from './lib/testfile'
import { test } from './lib/tests'
import { ts } from './lib/ts'

const appdata = getAppDataPath('bemoje', 'repoman')
fs.mkdirSync(appdata, { recursive: true })
const fpath = path.join(appdata, 'repo.txt')
if (!fs.existsSync(fpath)) {
  fs.writeFileSync(fpath, process.cwd(), 'utf8')
}
const cwd = fs.readFileSync(fpath, 'utf8').trim()
if (cwd !== process.cwd()) process.chdir(cwd)

const config = new Config('bemoje', 'repoman', {
  repoRootDirectory: {
    description: 'The path to the root directory of your repositories.',
    default: process.cwd(),
    parse: parseString,
    validate: validateString,
  },
})

export const program = new Command()
  .name('rman')
  .description('Description: Tools for management of an NX mono-repo.\n')
  .version('0.0.0')

createCommand(program, {
  command: 'b',
  aliases: ['build'],
  summary: 'Run build for all or selected packages.',
  arguments: [
    {
      name: 'packages',
      description: 'Names of packages to include. If omitted, all packages are included.',
      isOptional: true,
      isCommaDelimited: true,
    },
  ],
  usage: [
    { command: 'rman build', description: 'Run build for all packages.' },
    { command: 'rman build pack1,pack2', description: "Run build for packages 'pack1' and 'pack2'." },
  ],
  action: build,
})

createCommand(program, {
  command: 't',
  aliases: ['test'],
  summary: 'Run tests for all or selected packages.',
  arguments: [
    {
      name: 'packages',
      description: 'Names of packages to include. If omitted, all packages are included.',
      isOptional: true,
      isCommaDelimited: true,
    },
  ],
  usage: [
    { command: 'rman test', description: 'Run tests for all packages.' },
    { command: 'rman test pack1,pack2', description: "Run tests for packages 'pack1' and 'pack2'." },
  ],
  action: test,
})

createCommand(program, {
  command: 'l',
  aliases: ['lint'],
  summary: 'Run lint for all or selected packages.',
  arguments: [
    {
      name: 'packages',
      description: 'Names of packages to include. If omitted, all packages are included.',
      isOptional: true,
      isCommaDelimited: true,
    },
  ],
  usage: [
    { command: 'rman lint', description: 'Run lint for all packages.' },
    { command: 'rman lint pack1,pack2', description: "Run lint for packages 'pack1' and 'pack2'." },
  ],
  action: lint,
})

createCommand(program, {
  command: 'd',
  aliases: ['docs'],
  summary: 'Generate docs for all packages.',
  usage: [{ command: 'rman docs', description: 'Generate docs for all packages.' }],
  action: docs,
})

createCommand(program, {
  command: 'f',
  aliases: ['fix'],
  summary: 'Run fix-commands.',
  options: [
    {
      name: 'readmes',
      char: 'r',
      description: 'Generate/update readme files in all packages.',
      isOptional: true,
    },
    {
      name: 'includes',
      char: 'i',
      description:
        'Fix tsconfig.json files in all packages. The "includes" array sometimes gets changed automatically. This changes them back.',
      isOptional: true,
    },
    {
      name: 'deps',
      char: 'd',
      description:
        'Installs missing and uninstalls unused packages. Scans all source files and their imports and ensures package.json files are up to date.',
      isOptional: true,
    },
    {
      name: 'entrypoints',
      char: 'e',
      description: 'Re-generate all index.ts entrypoints in all packages.',
      isOptional: true,
    },
    {
      name: 'package-jsons',
      char: 'p',
      description: 'Ensure that various meta data is added to all package.json files.',
      isOptional: true,
    },
  ],
  usage: [
    { command: 'rman fix', description: 'Run all commands.' },
    { command: 'rman fix --readmes --deps', description: 'Run the readmes and deps commands.' },
  ],
  action: fixAll,
})

createCommand(program, {
  command: 'e',
  aliases: ['foreach', 'each', 'fe'],
  summary: 'Execute command for each package with their root dirs as cwd.',
  usage: [
    {
      command: 'rman foreach npm install',
      description: "Run 'npm install' in the root directory of each package.",
    },
    {
      command: 'rman foreach -p pack1,pack2 npm install',
      description: "Run 'npm install' for only the 'pack1' and 'pack2' packages.",
    },
    {
      command: 'rman foreach -i pack1,pack2 npm install',
      description: "Run 'npm install' for all packages except for the 'pack1' and 'pack2' packages.",
    },
  ],
  arguments: [
    {
      name: 'command',
      description: 'The command to run. Args are concatenated so no need to wrap in quotes.',
      isOptional: false,
      isRest: true,
    },
  ],
  options: [
    {
      name: 'packages',
      char: 'p',
      description: 'Names of packages to include.',
      argument: 'names',
      isCommaDelimited: true,
    },
    {
      name: 'ignore',
      char: 'i',
      description: 'Names of packages to ignore.',
      argument: 'names',
      isCommaDelimited: true,
    },
  ],
  action: forEach,
})

createCommand(program, {
  command: 'pre',
  aliases: ['precommit', 'prepub', 'pre-publish'],
  summary: 'Run lint, test, build, docs and fix.',
  arguments: [
    {
      name: 'packages',
      description: 'Names of packages to include. If omitted, all packages are included.',
      isOptional: true,
      isCommaDelimited: true,
    },
  ],
  usage: [
    { command: 'rman precommit', description: 'Run precommit for all packages.' },
    { command: 'rman precommit pack1,pack2', description: "Run precommit for packages 'pack1' and 'pack2'." },
  ],
  action: prepub,
})

createCommand(program, {
  command: 'pub',
  aliases: ['publish', 'npmpublish', 'npm-publish'],
  summary: 'Publish all or selected packages to NPM.',
  details: [
    'First executes precommit, then publishes all packages whose builds have changed, then git commits.',
    'All package dist directories are hashed every time they are published.',
    'Even if specific packages are selected, if other packages that they depend on have changes, they are published as well.',
  ],
  arguments: [
    {
      name: 'level',
      description: 'The semver level to bump.',
      choices: ['major', 'minor', 'patch'],
      default: { value: 'patch' },
    },
    {
      name: 'packages',
      description: 'Names of packages to include. If omitted, all packages are included.',
      isOptional: true,
      isCommaDelimited: true,
    },
  ],
  usage: [
    { command: 'rman publish patch', description: 'Publish new version (patch) of all packages with changes.' },
    {
      command: 'rman publish minor pack1,pack2',
      description:
        "Publish new version (minor) of packages 'pack1', 'pack2' and their dependencies if they have changes.",
    },
  ],
  action: publish,
})

createCommand(program, {
  command: 'rh',
  aliases: ['rehash', 're-hash'],
  summary: 'Rehash all or selected packages.',
  details: [
    'The files in the dist directories for each package are hashed when published to npm.',
    'When using the publish command, the hash determines if there were changes and thereby determines whether a package needs to get published or not.',
    'Hashing a package means that if its dist directory has not changed before the next publish, it will not get published.',
  ],
  arguments: [
    {
      name: 'packages',
      description: 'Names of packages to include. If omitted, all packages are included.',
      isOptional: true,
      isCommaDelimited: true,
    },
  ],
  usage: [
    { command: 'rman rehash', description: 'Rehash all packages.' },
    { command: 'rman rehash pack1,pack2', description: "Rehash packages 'pack1' and 'pack2'." },
  ],
  action: rehash,
})

createCommand(program, {
  command: 'ts',
  aliases: ['typescript'],
  summary: 'Run a .ts file.',
  details: [
    'Provide a full path or partial path search terms.',
    'Path segments are joined to a single search string.',
    'The first filepath found in any package to match, is the file that is run.',
  ],
  usage: [
    { command: 'rman ts somefile.ts', description: "Find and run filepath containing 'somefile.ts'." },
    { command: 'rman ts src index.ts', description: "Find and run filepath containing 'src/index.ts'." },
  ],
  arguments: [
    {
      name: 'paths',
      description: 'Path segments to search for.',
      isOptional: false,
      isRest: true,
    },
  ],
  options: [
    {
      name: 'script',
      char: 's',
      description: 'Search in ./scripts instead of ./packages.',
    },
  ],
  action: ts,
})

createCommand(program, {
  command: 'tf',
  aliases: ['testfile'],
  summary: 'Find and run a .test.ts. file.',
  details: [
    'Provide a full path or partial path search terms.',
    'Path segments are joined to a single search string.',
    'The first filepath found in any package to match is selected.',
  ],
  usage: [
    { command: 'rman testfile file.test.ts', description: "Find and run filepath containing 'file.test.ts'." },
    {
      command: 'rman testfile tests file.test.ts',
      description: "Find and run filepath containing 'tests/file.test.ts'.",
    },
  ],
  arguments: [
    {
      name: 'paths',
      description: 'Path segments to search for.',
      isOptional: false,
      isRest: true,
    },
  ],
  options: [
    {
      name: 'coverage',
      char: 'c',
      description: 'Whether to emit coverage.',
    },
  ],
  action: testfile,
})

createCommand(program, {
  command: 'td',
  aliases: ['testdir'],
  summary: 'Find and run all tests in a directory.',
  details: [
    'Provide a full path or partial path search terms.',
    'Path segments are joined to a single search string.',
    'The first directory path found in any package to match is selected.',
  ],
  usage: [
    {
      command: 'rman testdir my-package tests',
      description: "Find and run tests in directory containing 'my-package/tests'.",
    },
  ],
  arguments: [
    {
      name: 'paths',
      description: 'Path segments to search for.',
      isOptional: false,
      isRest: true,
    },
  ],
  options: [
    {
      name: 'coverage',
      char: 'c',
      description: 'Whether to emit coverage.',
    },
  ],
  action: testdir,
})

createCommand(program, {
  command: 'cp',
  aliases: ['create-package', 'createpackage'],
  summary: 'Create a package.',
  arguments: [
    {
      name: 'name',
      description: 'The name of the package.',
    },
  ],
  usage: [{ command: 'rman create-package pack1', description: 'Create a new package named pack1.' }],
  action: createPackage,
})

createCommand(program, {
  command: 'dp',
  aliases: ['delete-package', 'deletepackage'],
  summary: 'Delete a package.',
  arguments: [
    {
      name: 'name',
      description: 'The name of the package.',
    },
  ],
  usage: [{ command: 'rman delete-package pack1', description: 'Delete the package named pack1.' }],
  action: deletePackage,
})

createCommand(program, {
  command: 'pd',
  aliases: ['deps', 'package-deps', 'packagedeps'],
  summary: 'Print useful details about package dependencies.',
  usage: [{ command: 'rman deps', description: 'Print dependency information.' }],
  action: packageDependencies,
})

createCommand(program, {
  command: 'od',
  aliases: ['open-docs'],
  summary: 'Open the docs website in the browser.',
  usage: [{ command: 'rman open-docs', description: 'Open docs website.' }],
  action: openDocs,
})

createCommand(program, {
  command: 'oc',
  aliases: ['open-coverage'],
  summary: 'Open the coverage report in the browser.',
  usage: [{ command: 'rman open-coverage', description: 'Open coverage report.' }],
  action: openCoverage,
})

createCommand(program, {
  command: 'all-help',
  summary: 'Print help for every command.',
  usage: [{ command: 'rman extended-help' }],
  action: () => {
    const APPDATADIR = getAppDataPath('bemoje', 'repoman')
    const helpfilepath = path.join(APPDATADIR, 'help.txt')
    const version = execute(`rman --version`, { noEcho: true, silent: true }).trim()
    if (fs.existsSync(helpfilepath)) {
      const lines = fs.readFileSync(helpfilepath, 'utf8').split('\n')
      const helpVersion = lines.shift() as unknown as string
      console.log({ version, helpVersion })
      if (version === helpVersion) {
        console.log(lines.join('\n'))
        return
      }
      fs.rmSync(helpfilepath)
    }
    const helps: string[] = [version]
    const log = (s: string) => {
      console.log(s)
      helps.push(s)
    }
    program.commands.forEach((cmd) => {
      const aliases = cmd.aliases()
      if (!aliases) return
      const alias = aliases[0]
      if (!alias) return
      log('\n\n' + colors.bold(colors.magenta('rman ' + alias)))
      log(colors.gray(colors.dim('---------------------------------------------')))
      let help = execute(`rman help ${alias}`, { noEcho: true, silent: true })
      help = help
        .replace(/^Usage:/gm, colors.cyan('Usage:'))
        .replace(/^Description:/gm, colors.cyan('Description:'))
        .replace(/^Example Usage:/gm, colors.cyan('Example Usage:'))
        .replace(/^Options:/gm, colors.cyan('Options:'))
        .replace(/\r*\n\r*\n/g, '\n')
      log(help)
    })

    log('\n\n' + colors.green(colors.bold('rman')))
    log(colors.gray(colors.dim('---------------------------------------------')))
    const help = execute(`rman help`, { noEcho: true, silent: true })
    log(
      help
        .replace(/^Usage:/gm, colors.cyan('Usage:'))
        .replace(/^Description:/gm, colors.cyan('Description:'))
        .replace(/^Commands:/gm, colors.cyan('Commands:'))
        .replace(/^Options:/gm, colors.cyan('Options:'))
        .replace(/\r*\n\r*\n/g, '\n')
    )
    console.log()
    fs.writeFileSync(helpfilepath, helps.join('\n'), 'utf8')
  },
})

// program
//   .command('wom')
//   .aliases(['wipe-own-modules', 'wipeownmodules'])
//   .description('Delete node_modules of your own @scope - in all packages.')
//   .option('-l, --package-lock', 'Delete the package-lock.json files, too.')
//   .option('-r, --root', 'Perform these actions in the root directory of the monorepo, too.')
//   .action((options = {}) => {
//     console.log({ options })
//     // { packageLock: true, root: true }
//     // wipeOwnNodeModules()
//   })

// program
//   .command('wam')
//   .aliases(['wipe-all-modules', 'wipeallmodules'])
//   .description('Delete node_modules of your own @scope - in all packages.')
//   .option('-l, --package-lock', 'Delete the package-lock.json files, too.')
//   .option('-r, --root', 'Perform these actions in the root directory of the monorepo, too.')
//   .action((options = {}) => {
//     console.log({ options })
//     // { packageLock: true, root: true }
//     // wipeOwnNodeModules()
//   })

program.configureHelp({
  subcommandTerm: (cmd) => `${cmd.name().padEnd(3, ' ')}${cmd.alias() ? '|' + cmd.alias() : ''}`,
})

config.initialize(program)

program.parse()

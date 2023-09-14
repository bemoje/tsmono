import { Config, parseString, validateString } from '@bemoje/commander-config'
import { colors, getAppDataPath } from '@bemoje/util'
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
import { script } from './lib/script'
import { test } from './lib/tests'
import { testdir, testfile, ts } from './lib/ts'
const { dim, green, gray } = colors

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
  .description('Tools for management of an NX mono-repo..')
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
  command: 'pre',
  aliases: ['precommit', 'prepub', 'pre-publish'],
  summary: 'Run lint, test, build, docs and fixall for specified or all packages.',
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
      isOptional: true,
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
  action: ts,
})

program
  .command('tf')
  .aliases(['test-file', 'testfile'])
  .summary('Find and run a .test.ts. file.')
  .description(
    'Find and run a .test.ts file. The search starts in ./packages. The path segments are joined and act as a single search string that must exact-matche somewhere in the full path string.'
  )
  .option('-c, --coverage', 'Whether to emit coverage.')
  .argument('<paths...>', 'Path segments to search for.')
  .action(testfile)

program
  .command('td')
  .aliases(['test-dir', 'testdir'])
  .description('Find directory and run all its .test.ts files - in ./packages')
  .option('-c, --coverage', 'Whether to emit coverage.')
  .argument('<paths...>', 'Path segments to search for.')
  .action(testdir)

program
  .command('rs')
  .aliases(['run-script', 'script', 'runscript'])
  .description('Run a typescript file under ./scripts')
  .argument('<paths...>', 'Path segments to search for.')
  .action(script)

program
  .command('cp')
  .aliases(['create-package', 'createpackage'])
  .description('Create a new library package.')
  .argument('<name>', 'Dirpath segments to search.')
  .action(createPackage)

program
  .command('dp')
  .aliases(['delete-package', 'deletepackage'])
  .description('Delete a package.')
  .argument('<name>', 'Dirpath segments to search.')
  .action(deletePackage)

program
  .command('e')
  .aliases(['each', 'foreach'])
  .summary('Execute command for each package with their root dirs as cwd.')
  .option('-p, --packages [names]', 'Names of packages to include.')
  .option('-i, --ignore [names]', 'Names of packages to exclude.')
  .argument('<command...>', 'The command to run. Args are concatenated so no need to wrap in quotes.')
  .action(forEach)

program
  .command('pd')
  .aliases(['deps', 'package-deps', 'packagedeps'])
  .description('Show information about package dependencies.')
  .action(packageDependencies)

program
  .command('wom')
  .aliases(['wipe-own-modules', 'wipeownmodules'])
  .description('Delete node_modules of your own @scope - in all packages.')
  .option('-l, --package-lock', 'Delete the package-lock.json files, too.')
  .option('-r, --root', 'Perform these actions in the root directory of the monorepo, too.')
  .action((options = {}) => {
    console.log({ options })
    // { packageLock: true, root: true }
    // wipeOwnNodeModules()
  })

program
  .command('wam')
  .aliases(['wipe-all-modules', 'wipeallmodules'])
  .description('Delete node_modules of your own @scope - in all packages.')
  .option('-l, --package-lock', 'Delete the package-lock.json files, too.')
  .option('-r, --root', 'Perform these actions in the root directory of the monorepo, too.')
  .action((options = {}) => {
    console.log({ options })
    // { packageLock: true, root: true }
    // wipeOwnNodeModules()
  })

program.command('od').aliases(['open-docs']).description('Open the docs website in the browser.').action(openDocs)

program
  .command('oc')
  .aliases(['open-coverage'])
  .description('Open the test coverage results website in the browser.')
  .action(openCoverage)

program.configureHelp({
  subcommandTerm: (cmd) => `${cmd.name().padEnd(3, ' ')}${cmd.alias() ? '|' + cmd.alias() : ''}`,
})

config.initialize(program)

program.parse()

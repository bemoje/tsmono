import { Config, parseString, validateString } from '@bemoje/commander-config'
import { Command } from 'commander'
import { createCommand } from './createCommand'
import { allHelp } from './lib/allHelp'
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
import { rmandev } from './lib/rmandev'
import { testfile } from './lib/testfile'
import { test } from './lib/tests'
import { ts } from './lib/ts'
import { wipeNodeModules } from './lib/wipeNodeModules'

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
  options: [
    {
      name: 'coverage',
      char: 'c',
      description: 'Whether to emit coverage.',
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
  command: 'dev',
  aliases: ['rman-dev'],
  summary: 'Run rman in dev mode',

  arguments: [
    {
      name: 'paths',
      description: 'Path segments to search for.',
      isOptional: true,
      isRest: true,
    },
  ],
  action: rmandev,
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
  options: [
    {
      name: 'ignoreHash',
      char: 'i',
      description: 'Ignore hashes so publish even if the hash determines it is not necessary.',
    },
  ],
  action: publish,
})

createCommand(program, {
  command: 'wnm',
  aliases: ['wipe-modules'],
  summary: 'Clear node_modules.',
  usage: [
    {
      command: 'rman wipe-modules -l -r',
      description: 'Delete all node_modules in all packages and repo root, including all package-lock.json files.',
    },
    {
      command: 'rman wipe-modules my-package -l',
      description: "Delete all node_modules and package-lock.json in the package, 'my-package'",
    },
    {
      command: 'rman wipe-modules -s bemoje',
      description: 'Delete @bemoje scoped node_modules in all packages.',
    },
  ],
  arguments: [
    {
      name: 'packages',
      description: 'Names of packages to include. If omitted, all packages are included.',
      isOptional: true,
      isCommaDelimited: true,
    },
  ],
  options: [
    {
      name: 'scope',
      char: 's',
      description: 'Delete only node_modules within a given scope, which could also be your own.',
      argument: 'scope',
    },
    {
      name: 'package-lock',
      char: 'l',
      description: 'Delete the package-lock.json files, too.',
    },
    {
      name: 'root',
      char: 'r',
      description: 'Perform these actions in the root directory of the monorepo, too.',
    },
  ],
  action: wipeNodeModules,
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
      name: 'dir',
      char: 'd',
      description: 'Test all files in the directory where the file is found.',
    },
    {
      name: 'coverage',
      char: 'c',
      description: 'Whether to emit coverage.',
    },
  ],
  action: testfile,
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
  usage: [
    { command: 'rman deps', description: 'Print dependency information.' },
    {
      command: 'rman deps my-package',
      description: "Print additional dependency information about the package, 'my-package'.",
    },
  ],
  arguments: [
    {
      name: 'package',
      description: 'The name of the package.',
      isOptional: true,
    },
  ],
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
  arguments: [
    {
      name: 'package',
      description: 'The name of the package.',
    },
  ],
  action: openCoverage,
})

createCommand(program, {
  command: 'all-help',
  summary: 'Print help for every command.',
  usage: [{ command: 'rman all-help' }],
  action: () => {
    allHelp(program)
  },
})

config.initialize(program)

program.configureHelp({
  subcommandTerm: (cmd) => `${cmd.alias() ? cmd.alias().padEnd(3, ' ') + '|' : ''}${cmd.name()}`,
})

process.chdir(config.data.user.get('repoRootDirectory'))

program.parse()

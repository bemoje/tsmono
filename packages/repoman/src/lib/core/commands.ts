import { build } from '../actions/build'
import { createPackage } from '../actions/createPackage'
import { deletePackage } from '../actions/deletePackage'
import { docs } from '../actions/docs'
import { fixAll } from '../actions/fixAll'
import { forEach } from '../actions/forEach'
import { lint } from '../actions/lint'
import { openCoverage } from '../actions/openCoverage'
import { openDocs } from '../actions/openDocs'
import { packageDependencies } from '../actions/packageDependencies'
import { prepub } from '../actions/prepub'
import { publish } from '../actions/publish'
import { rehash } from '../actions/rehash'
import { rmandev } from '../actions/rmandev'
import { testfile } from '../actions/testfile'
import { test } from '../actions/tests'
import { ts } from '../actions/ts'
import { wipeNodeModules } from '../actions/wipeNodeModules'

export const commands = [
  {
    command: 'build',
    aliases: ['b'],
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
  },

  {
    command: 'test',
    aliases: ['t'],
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
  },

  {
    command: 'lint',
    aliases: ['l'],
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
  },

  {
    command: 'docs',
    aliases: ['d'],
    summary: 'Generate docs for all packages.',
    usage: [{ command: 'rman docs', description: 'Generate docs for all packages.' }],
    action: docs,
  },

  {
    command: 'fix',
    aliases: ['f'],
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
  },

  {
    command: 'foreach',
    aliases: ['fe', 'each'],
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
  },

  {
    command: 'dev',
    aliases: ['D'],
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
  },

  {
    command: 'precommit',
    aliases: ['pre', 'prepub', 'pre-publish'],
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
  },

  {
    command: 'publish',
    aliases: ['pub', 'npmpublish', 'npm-publish'],
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
  },

  {
    command: 'wipe-modules',
    aliases: ['wm'],
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
  },

  {
    command: 'rehash',
    aliases: ['rh', 're-hash'],
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
  },

  {
    command: 'runts',
    aliases: ['ts'],
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
  },

  {
    command: 'testfile',
    aliases: ['tf'],
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
  },

  {
    command: 'create-package',
    aliases: ['cp', 'createpackage'],
    summary: 'Create a package.',
    arguments: [
      {
        name: 'name',
        description: 'The name of the package.',
      },
    ],
    usage: [{ command: 'rman create-package pack1', description: 'Create a new package named pack1.' }],
    action: createPackage,
  },

  {
    command: 'delete-package',
    aliases: ['dp', 'deletepackage'],
    summary: 'Delete a package.',
    arguments: [
      {
        name: 'name',
        description: 'The name of the package.',
      },
    ],
    usage: [{ command: 'rman delete-package pack1', description: 'Delete the package named pack1.' }],
    action: deletePackage,
  },

  {
    command: 'deps',
    aliases: ['pd', 'package-deps', 'packagedeps'],
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
  },

  {
    command: 'opendocs',
    aliases: ['od'],
    summary: 'Open the docs website in the browser.',
    usage: [{ command: 'rman open-docs', description: 'Open docs website.' }],
    action: openDocs,
  },

  {
    command: 'opencov',
    aliases: ['oc'],
    summary: 'Open the coverage report in the browser.',
    usage: [{ command: 'rman open-coverage', description: 'Open coverage report.' }],
    arguments: [
      {
        name: 'package',
        description: 'The name of the package.',
      },
    ],
    action: openCoverage,
  },
]

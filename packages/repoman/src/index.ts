import { Config, parseString, validateString } from '@bemoje/commander-config'
import { colors, getAppDataPath, strWrapInAngleBrackets, strWrapInBrackets } from '@bemoje/util'
import { Argument, Command, Option } from 'commander'
import fs from 'fs'
import path from 'path'
import { build } from './lib/build'
import { createPackage } from './lib/createPackage'
import { deletePackage } from './lib/deletePackage'
import { docs } from './lib/docs'
import { fixAll } from './lib/fixAll'
import { fixDependencies } from './lib/fixDependencies'
import { fixEntryPoints } from './lib/fixEntryPoints'
import { fixPackageJson } from './lib/fixPackageJson'
import { fixReadmes } from './lib/fixReadmes'
import { fixTsConfigIncludes } from './lib/fixTsConfigIncludes'
import { forEach } from './lib/forEach'
import { forOne } from './lib/forOne'
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

export const program = new Command().name('rman').description('Repo management tools.').version('0.0.0')

program
  .command('build')
  .description('Run build for all or selected packages.')
  .argument('[packages...]', 'Names of packages to build. If omitted, all packages are built.')
  .action(build)

program
  .command('test')
  .description('Run tests for all or selected packages.')
  .argument('[packages...]', 'Names of packages to test. If omitted, all packages are tested.')
  .action(test)

program
  .command('lint')
  .description('Run lint for all or selected packages.')
  .argument('[packages...]', 'Names of packages to lint. If omitted, all packages are linted.')
  .action(lint)

program.command('docs').description('Generate docs for entire monorepo.').action(docs)

program
  .command('pre')
  .aliases(['pre-commit', 'precommit', 'prepub', 'pre-publish'])
  .description('Run lint, test, build and docs for specified or all packages.')
  .argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
  .action(prepub)

program
  .command('pub')
  .aliases(['publish', 'npm-publish'])
  .description('Run prepub and then automatically publish all packages whose dist directories have changed.')
  .argument('<level>', 'The semver level to bump. Accepted values: "major", "minor", "patch"')
  .argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
  .action(publish)

program
  .command('rh')
  .aliases(['rehash', 're-hash'])
  .description('Rehash the files in dist directories. This determines when to publish new versions of packages.')
  .action(rehash)

const prettyDescription = (header: string, ...lines: string[]): string => {
  const bullets = lines.map((line) => dim('- ') + gray(line)).join('\n')
  return 'Description: ' + header + '\n' + bullets + '\n'
}

interface ICreateCommandOptions {
  command: string
  aliases?: string[]
  summary: string
  description?: string[]
  arguments?: ICreateCommandOptionsArgument[]
  options?: ICreateCommandOptionsOptions[]
  action: (...args: any[]) => void | Promise<void>
}
interface ICreateCommandOptionsDefault {
  value: unknown
  description?: string
}
interface ICreateCommandOptionsArgument {
  name: string
  description: string
  isOptional?: boolean
  isRest?: boolean
  default?: ICreateCommandOptionsDefault
  choices?: string[]
}
interface ICreateCommandOptionsOptions {
  name: string
  char?: string
  description: string
  argument?: string
  isOptional?: boolean
  default?: ICreateCommandOptionsDefault
  choices?: string[]
  conflicts?: string[]
}
function createCommand(program: Command, options: ICreateCommandOptions): typeof program {
  const command = program.command(options.command).summary(options.summary)
  if (options.aliases) {
    command.aliases(options.aliases)
  }
  if (options.description) {
    const bullets = options.description.map((line) => dim('- ') + gray(line)).join('\n')
    command.description('Description: ' + options.summary + '\n' + bullets + '\n')
  }
  if (options.arguments) {
    for (const opt of options.arguments) {
      const { name, description, isOptional, isRest, choices } = opt
      const wrapper = isOptional ? strWrapInBrackets : strWrapInAngleBrackets
      const _name = isRest ? '...' + name : name
      const argument = new Argument(wrapper(_name), description)
      if (opt.default) argument.default(opt.default.value, opt.default.description)
      if (choices) argument.choices(choices)
      command.addArgument(argument)
    }
  }
  if (options.options) {
    for (const opt of options.options) {
      const { name, char, description, argument, isOptional, choices, conflicts } = opt
      const wrapper = isOptional ? strWrapInBrackets : strWrapInAngleBrackets
      const _name = `-${char}, --${name}${argument ? ' ' + wrapper(argument) : ''}`
      const option = new Option(_name, description)
      if (opt.default) option.default(opt.default.value, opt.default.description)
      if (choices) option.choices(choices)
      if (conflicts) option.conflicts(conflicts)
      command.addOption(option)
    }
  }
  return command
}

createCommand(program, {
  command: 'ts',
  aliases: ['typescript'],
  summary: 'Run a .ts file.',
  description: [
    'Provide a full path or partial path search terms.',
    'The search root directory is ./packages.',
    'The path segments are joined to a single search string.',
    'The first filepath found to exact-match anywhere in the string, is the file that is run.',
    'Example: "rman ts src lib index.ts"',
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

// program
//   .command('ts')
//   .aliases(['typescript'])
//   .summary('Find and run a .ts file.')
//   .description(
//     prettyDescription(
//       'Find and run a .ts file.',
//       'The search starts in ./packages.',
//       'The path segments are joined to a single search string. The first filepath found to exact-match anywhere in the string, is the file that is run.'
//     )
//   )
//   .argument('<paths...>', 'Path segments to search for.')
//   .action(ts)

program
  .command('tf')
  .aliases(['test-file', 'testfile'])
  .summary('Find and run a .test.ts. file.')
  .description(
    'Find and run a .test.ts file. The search starts in ./packages. The path segments are joined as acts as a single search string that must exact-matche somewhere in the full path string.'
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
  .command('fe')
  .aliases(['for-each', 'execforeach'])
  .description(green('Execute a shell command with each package root as cwd.'))
  .option('-p, --packages [names]', 'Names of packages to include.')
  .option('-i, --ignore [names]', 'Names of packages to exclude.')
  .argument('<command...>', 'The command to run. Args are concatenated so no need to wrap in quotes.')
  .action(forEach)

program
  .command('fo')
  .aliases(['for-one', 'execforone'])
  .summary('Execute shell command with package root as cwd.')
  .description('long text')
  .argument('<package>', 'The name of the package.')
  .argument('<command...>', 'The command to run. Args are concatenated so no need to wrap in quotes.')
  .action(forOne)

program
  .command('pd')
  .aliases(['deps', 'package-deps', 'packagedeps'])
  .description('Show information about package dependencies.')
  .action(packageDependencies)

program
  .command('fr')
  .aliases(['fix-readmes', 'fixreadmes'])
  .description('Generate/update readme files in all packages.')
  .action(fixReadmes)

program
  .command('fi')
  .aliases(['fix-includes', 'fixincludes'])
  .description(
    'Fix tsconfig.json files in all packages. The "includes" array sometimes gets changed automatically. This changes them back.'
  )
  .action(fixTsConfigIncludes)

program
  .command('fd')
  .aliases(['fix-deps', 'fixdeps'])
  .description(
    'Installs missing and uninstalls unused packages. Scans all source files and their imports and ensures package.json files are up to date.'
  )
  .action(fixDependencies)

program
  .command('fep')
  .aliases(['fix-entry-points', 'fixentrypoints'])
  .description('Re-generate all index.ts entrypoints in all packages.')
  .action(fixEntryPoints)

program
  .command('fpj')
  .aliases(['fix-package-jsons', 'fixpackagejsons'])
  .description('Ensure that various meta data is added to all package.json files.')
  .action(fixPackageJson)

program
  .command('fa')
  .aliases(['fix', 'fix-all', 'fixall'])
  .description('Run all fix-commands: readmes, tsconfigs, deps, entrypoints, package-jsons')
  .action(fixAll)

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

config.initialize(program)

program.parse()

import { Config, parseString, validateString } from '@bemoje/commander-config'
import { colors, getAppDataPath } from '@bemoje/util'
import { Command } from 'commander'
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
const { red, blue, dim, bold, magenta, green, gray } = colors

const appdata = getAppDataPath('bemoje', 'repoman')
fs.mkdirSync(appdata, { recursive: true })
const fpath = path.join(appdata, 'repo.txt')
if (!fs.existsSync(fpath)) {
  fs.writeFileSync(fpath, process.cwd(), 'utf8')
}
const cwd = fs.readFileSync(fpath, 'utf8').trim()
if (cwd !== process.cwd()) process.chdir(cwd)

const args = process.argv.slice(2)
const cmd = args.shift()?.toLowerCase().replace(/-/g, '')

const help = () => {
  const lines = fs.readFileSync(__filename, 'utf8').split(/\r*\n/)
  const filtered = lines.filter((line) => line.includes('else if ' + '(cmd ==='))
  const cmds = filtered.map((line) => {
    const i1 = line.indexOf("'")
    const i2 = line.lastIndexOf("'")
    const cmd = line.substring(i1 + 1, i2)
    return cmd
  })

  console.log('\n\n' + bold(blue('Commands:\n')) + cmds.map((s) => dim('- ') + s).join('\n') + '\n\n')
}

const editDefaultCwd = () => {
  console.log({ defaultCwdConfigFile: fpath })
}

const unknownCommand = () => {
  console.log('\n' + magenta('\nUnknown command: ') + "'" + red(bold(String(cmd))) + "'")
  help()
}

// async function main() {
//   if (!cmd) help()
//   else if (cmd === 'help'.toLowerCase()) help()
//   else if (cmd === 'editDefaultCwd'.toLowerCase()) editDefaultCwd()
//   else if (cmd === 'ts'.toLowerCase()) await ts(args)
//   else if (cmd === 'testfile'.toLowerCase()) await testfile(args)
//   else if (cmd === 'testdir'.toLowerCase()) await testdir(args)
//   else if (cmd === 'script'.toLowerCase()) script(args)
//   else if (cmd === 'createPackage'.toLowerCase()) createPackage(args)
//   else if (cmd === 'deletePackage'.toLowerCase()) deletePackage(args)
//   else if (cmd === 'packageDependencies'.toLowerCase()) packageDependencies()
//   else if (cmd === 'rehash'.toLowerCase()) rehash()
//   else if (cmd === 'fixReadmes'.toLowerCase()) fixReadmes()
//   else if (cmd === 'fixTsConfigIncludes'.toLowerCase()) fixTsConfigIncludes()
//   else if (cmd === 'fixDependencies'.toLowerCase()) fixDependencies()
//   else if (cmd === 'fixEntryPoints'.toLowerCase()) fixEntryPoints()
//   else if (cmd === 'fixPackageJson'.toLowerCase()) fixPackageJson()
//   else if (cmd === 'fixAll'.toLowerCase()) fixAll()
//   else if (cmd === 'forEach'.toLowerCase()) forEach(args)
//   else if (cmd === 'forOne'.toLowerCase()) forOne(args)
//   else if (cmd === 'wipeNodeModules'.toLowerCase()) wipeNodeModules(args)
//   else if (cmd === 'wipeOwnNodeModules'.toLowerCase()) wipeOwnNodeModules(args)
//   else if (cmd === 'lint'.toLowerCase()) lint(args)
//   else if (cmd === 'test'.toLowerCase()) test(args)
//   else if (cmd === 'build'.toLowerCase()) build(args)
//   else if (cmd === 'docs'.toLowerCase()) docs()
//   else if (cmd === 'prepub'.toLowerCase()) prepub(args)
//   else if (cmd === 'publish'.toLowerCase()) publish(args)
//   else if (cmd === 'openDocs'.toLowerCase()) openDocs()
//   else if (cmd === 'openCoverage'.toLowerCase()) openCoverage()
//   else unknownCommand()
// }

// main().catch((e) => console.error(e))

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
  .description('Run builds for specified or all packages.')
  .argument('[packages...]', 'Names of packages to build. If omitted, all packages are built.')
  .action(build)

program
  .command('test')
  .description('Run tests for specified or all packages.')
  .argument('[packages...]', 'Names of packages to test. If omitted, all packages are tested.')
  .action(test)

program
  .command('lint')
  .description('Run lint for specified or all packages.')
  .argument('[packages...]', 'Names of packages to lint. If omitted, all packages are linted.')
  .action(lint)

program
  .command('docs')
  .description('Generate docs for specified or all packages.')
  .argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
  .action(docs)

program
  .command('pre')
  .aliases(['pre-commit', 'precommit', 'prepub', 'pre-publish'])
  .description('Run lint, test, build and docs for specified or all packages.')
  .argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
  .action(prepub)

program
  .command('pub')
  .aliases(['npm-publish'])
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

program
  .command('ts')
  .aliases(['typescript'])
  .summary('Find and run a .ts file.')
  .description(
    prettyDescription(
      'Find and run a .ts file.',
      'The search starts in ./packages.',
      'The path segments are joined to a single search string. The first filepath found to exact-match anywhere in the string, is the file that is run.'
    )
  )
  .argument('<paths...>', 'Path segments to search for.')
  .action(ts)

program
  .command('tf')
  .aliases(['test-file', 'testfile'])
  .summary('Find and run a .test.ts.')
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

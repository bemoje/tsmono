import path from 'path'
import { build } from './actions/build'
import { CLI, CommandBuilder } from '@bemoje/cli'
import { createPackage } from './actions/createPackage'
import { createRepoFiles } from './actions/createRepoFiles'
import { deletePackage } from './actions/deletePackage'
import { docs } from './actions/docs'
import { fixAll } from './actions/fixAll'
import { forEach } from './actions/forEach'
import { isStringArray } from '@bemoje/util'
import { lint } from './actions/lint'
import { openCoverage } from './actions/openCoverage'
import { openDocs } from './actions/openDocs'
import { packageDependencies } from './actions/packageDependencies'
import { prepub } from './actions/prepub'
import { publish } from './actions/publish'
import { rehash } from './actions/rehash'
import { rmandev } from './actions/rmandev'
import { test } from './actions/tests'
import { testfile } from './actions/testfile'
import { ts } from './actions/ts'
import { wipeNodeModules } from './actions/wipeNodeModules'

export const repoman = CLI('rman', (r) => {
  r.version('0.0.0')
  r.description('Tools for management of an NX mono-repo.')
  r.enableBuiltinOptions()
  r.presetsEnabled(true)
  initConfig(r)
  initCommands(r)
})

function initConfig(r: CommandBuilder) {
  r.config('repoRootDirs', {
    description:
      'Enter your monorepo root directories. If provided, as a safety measure: if running a command outside these directories, either an error will be thrown if multiple directories are given. If one is given, the command will be run with the given root directory as the current working directory.',
    defaultValue: [],
    parse: (string: string) => string.split(','),
    validate: isStringArray,
  })
}

function verifyCorrectDirectory(action: (...args: any[]) => void) {
  return function (...args: any[]) {
    const cmd = args.pop() as CommandBuilder
    const repoRootDirs = cmd.root.db.config.get<string[]>('repoRootDirs').map((dir) => path.normalize(dir))
    const cwd = process.cwd()
    if (repoRootDirs && repoRootDirs.length && !repoRootDirs.includes(cwd)) {
      if (repoRootDirs.length === 1) {
        process.chdir(repoRootDirs[0])
      } else if (repoRootDirs.length > 1) {
        console.error(
          'You are not in the root directory of the monorepo.',
          'Please change directory to one of the following:',
          repoRootDirs.join(', ')
        )
        process.exit(1)
      }
    }
    action(...args)
  }
}

function initCommands(r: CommandBuilder) {
  addBuildCommand(r)
  addTestCommand(r)
  addLintCommand(r)
  addDocsCommand(r)
  addFixCommand(r)
  addCreateRepoFilesCommand(r)
  addForEachCommand(r)
  addDevCommand(r)
  addPrecommitCommand(r)
  addPublishCommand(r)
  addWipeModulesCommand(r)
  addRehashCommand(r)
  addRuntsCommand(r)
  addTestFileCommand(r)
  addCreatePackageCommand(r)
  addDeletePackageCommand(r)
  addDepsCommand(r)
  addOpenDocsCommand(r)
  addOpenCoverageCommand(r)
}

function addBuildCommand(r: CommandBuilder) {
  r.command('build', (b) => {
    b.description('Run build for all or selected packages.')
    b.alias('b')
    b.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    b.action(verifyCorrectDirectory(build))
    b.usageExamples(
      { command: 'rman build', description: 'Run build for all packages.' },
      { command: 'rman build pack1 pack2', description: "Run build for packages 'pack1' and 'pack2'." }
    )
  })
}

function addTestCommand(r: CommandBuilder) {
  r.command('test', (t) => {
    t.description('Run tests for all or selected packages.')
    t.alias('t')
    t.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    t.option('-c, --coverage', 'Whether to emit coverage.')
    t.action(verifyCorrectDirectory(test))
    t.usageExamples(
      { command: 'rman test', description: 'Run tests for all packages.' },
      { command: 'rman test pack1 pack2', description: "Run tests for packages 'pack1' and 'pack2'." }
    )
  })
}

function addLintCommand(r: CommandBuilder) {
  r.command('lint', (l) => {
    l.description('Run lint for all or selected packages.')
    l.alias('l')
    l.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    l.action(verifyCorrectDirectory(lint))
    l.usageExamples(
      { command: 'rman lint', description: 'Run lint for all packages.' },
      { command: 'rman lint pack1 pack2', description: "Run lint for packages 'pack1' and 'pack2'." }
    )
  })
}

function addDocsCommand(r: CommandBuilder) {
  r.command('docs', (d) => {
    d.description('Generate docs for all packages.')
    d.alias('d')
    d.action(verifyCorrectDirectory(docs))
    d.usageExamples({ command: 'rman docs', description: 'Generate docs for all packages.' })
  })
}

function addFixCommand(r: CommandBuilder) {
  r.command('fix', (f) => {
    f.description('Run fix-commands.')
    f.alias('f')
    f.option('-r, --readmes', 'Generate/update readme files in all packages.')
    f.option(
      '-i, --includes',
      'Fix tsconfig.json files in all packages. The "includes" array sometimes gets changed automatically. This changes them back.'
    )
    f.option(
      '-d, --deps',
      'Installs missing and uninstalls unused packages. Scans all source files and their imports and ensures package.json files are up to date.'
    )
    f.option('-e, --entrypoints', 'Re-generate all index.ts entrypoints in all packages.')
    f.option('-p, --package-jsons', 'Ensure that various meta data is added to all package.json files.')
    f.action(verifyCorrectDirectory(fixAll))
    f.usageExamples(
      { command: 'rman fix', description: 'Run all commands.' },
      { command: 'rman fix --readmes --deps', description: 'Run the readmes and deps commands.' }
    )
  })
}

function addCreateRepoFilesCommand(r: CommandBuilder) {
  r.command('createRepoFiles', (b) => {
    b.description('Create repo files for all or selected packages.')
    b.alias('crf')
    b.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    b.action(verifyCorrectDirectory(createRepoFiles))
  })
}

function addForEachCommand(r: CommandBuilder) {
  r.command('forEach', (f) => {
    f.description('Execute command for each package with their root dirs as cwd.')
    f.aliases('fe', 'each')
    f.argument('[command...]', 'The command to run. Args are concatenated so no need to wrap in quotes.')
    f.option('-p, --packages <names...>', 'Names of packages to include.')
    f.option('-i, --ignore <names...>', 'Names of packages to ignore.')
    f.action(verifyCorrectDirectory(forEach))
    f.usageExamples(
      { command: 'rman foreach npm install', description: "Run 'npm install' in the root directory of each package." },
      {
        command: 'rman foreach npm install -p pack1 pack2',
        description: "Run 'npm install' for only the 'pack1' and 'pack2' packages.",
      }
    )
  })
}

function addDevCommand(r: CommandBuilder) {
  r.command('dev', (d) => {
    d.description('Run rman in dev mode')
    d.alias('D')
    d.argument('[paths...]', 'Path segments to search for.')
    d.action(verifyCorrectDirectory(rmandev))
  })
}

function addPrecommitCommand(r: CommandBuilder) {
  r.command('precommit', (p) => {
    p.description('Run lint, test, build, docs and fix.')
    p.aliases('pre', 'prepub', 'pre-publish')
    p.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    p.action(verifyCorrectDirectory(prepub))
    p.usageExamples(
      { command: 'rman precommit', description: 'Run precommit for all packages.' },
      { command: 'rman precommit pack1 pack2', description: "Run precommit for packages 'pack1' and 'pack2'." }
    )
  })
}

function addPublishCommand(r: CommandBuilder) {
  r.command('publish', (p) => {
    p.description('Publish all or selected packages to NPM.')
    p.aliases('pub', 'npmpublish', 'npm-publish')
    p.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    p.option('-l, --level <value>', (a) => {
      a.description('The semver level to bump.')
      a.choices(['major', 'minor', 'patch'])
      a.default('patch')
    })
    p.option('-i, --ignore-hash', 'Ignore hashes so publish even if the hash determines it is not necessary.')
    p.action(verifyCorrectDirectory(publish))
    p.usageExamples(
      { command: 'rman publish', description: 'Publish new version (patch) of all packages with changes.' },
      {
        command: 'rman publish -l minor pack1 pack2',
        description: "Publish minor version of 'pack1', 'pack2' + their deps.",
      }
    )
  })
}

function addWipeModulesCommand(r: CommandBuilder) {
  r.command('wipeModules', (w) => {
    w.description('Clear node_modules.')
    w.aliases('wm')
    w.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    w.option('-s, --scope <scope>', 'Delete only node_modules within a given scope, which could also be your own.')
    w.option('-l, --package-lock', 'Delete the package-lock.json files, too.')
    w.option('-r, --root', 'Perform these actions in the root directory of the monorepo, too.')
    w.action(verifyCorrectDirectory(wipeNodeModules))
    w.usageExamples(
      {
        command: 'rman wipe-modules pack1 -l',
        description: "Delete all node_modules and package-lock.json in 'pack1'",
      },
      { command: 'rman wipe-modules -s bemoje', description: 'Delete @bemoje scoped node_modules in all packages.' }
    )
  })
}

function addRehashCommand(r: CommandBuilder) {
  r.command('rehash', (r) => {
    r.description(
      'Rehash all or selected packages.',
      'The files in the dist directories for each package are hashed when published to npm.',
      'When using the publish command, the hash determines if there were changes and thereby determines whether a package needs to get published or not.',
      'Hashing a package means that if its dist directory has not changed before the next publish, it will not get published.'
    )
    r.aliases('rh')
    r.argument('[packages...]', 'Names of packages to include. If omitted, all packages are included.')
    r.action(verifyCorrectDirectory(rehash))
    r.usageExamples(
      { command: 'rman rehash', description: 'Rehash all packages.' },
      { command: 'rman rehash pack1 pack2', description: "Rehash packages 'pack1' and 'pack2'." }
    )
  })
}

function addRuntsCommand(r: CommandBuilder) {
  r.command('runts', (r) => {
    r.description(
      'Run a .ts file.',
      'Provide a full path or partial path search terms.',
      'Path segments are joined to a single search string.',
      'The first filepath found in any package to match, is the file that is run.'
    )
    r.aliases('ts')
    r.argument('[paths...]', 'Path segments to search for.')
    r.option('-s, --script', 'Search in ./scripts instead of ./packages.')
    r.action(verifyCorrectDirectory(ts))
    r.usageExamples(
      { command: 'rman ts somefile.ts', description: "Find and run filepath containing 'somefile.ts'." },
      { command: 'rman ts src index.ts', description: "Find and run filepath containing 'src/index.ts'." }
    )
  })
}

function addTestFileCommand(r: CommandBuilder) {
  r.command('testFile', (t) => {
    t.description(
      'Find and run a .test.ts. file.',
      'Provide a full path or partial path search terms.',
      'Path segments are joined to a single search string.',
      'The first filepath found in any package to match is selected.'
    )
    t.aliases('tf')
    t.argument('[paths...]', 'Path segments to search for.')
    t.option('-d, --dir', 'Test all files in the directory where the file is found.')
    t.option('-c, --coverage', 'Whether to emit coverage.')
    t.action(verifyCorrectDirectory(testfile))
    t.usageExamples(
      { command: 'rman testfile file.test.ts', description: "Find and run filepath containing 'file.test.ts'." },
      {
        command: 'rman testfile tests file.test.ts',
        description: "Find and run filepath containing 'tests/file.test.ts'.",
      }
    )
  })
}

function addCreatePackageCommand(r: CommandBuilder) {
  r.command('createPackage', (c) => {
    c.description('Create a package.')
    c.aliases('cp', 'createpackage')
    c.argument('<name>', 'The name of the package.')
    c.action(verifyCorrectDirectory(createPackage))
    c.usageExamples({ command: 'rman create-package pack1', description: 'Create a new package named pack1.' })
  })
}

function addDeletePackageCommand(r: CommandBuilder) {
  r.command('deletePackage', (d) => {
    d.description('Delete a package.')
    d.aliases('dp', 'deletepackage')
    d.argument('<name>', 'The name of the package.')
    d.action(verifyCorrectDirectory(deletePackage))
    d.usageExamples({ command: 'rman delete-package pack1', description: 'Delete the package named pack1.' })
  })
}

function addDepsCommand(r: CommandBuilder) {
  r.command('deps', (d) => {
    d.description('Print useful details about package dependencies.')
    d.aliases('pd', 'package-deps', 'packagedeps')
    d.argument('[package]', 'The name of the package.')
    d.action(verifyCorrectDirectory(packageDependencies))
    d.usageExamples(
      { command: 'rman deps', description: 'Print dependency information.' },
      {
        command: 'rman deps my-package',
        description: "Print additional dependency information about the package, 'my-package'.",
      }
    )
  })
}

function addOpenDocsCommand(r: CommandBuilder) {
  r.command('openDocs', (o) => {
    o.description('Open the docs website in the browser.')
    o.aliases('od')
    o.action(verifyCorrectDirectory(openDocs))
    o.usageExamples(
      { command: 'rman open-docs', description: 'Open docs website.' },
      { command: 'rman open-docs', description: 'Open docs website.' }
    )
  })
}

function addOpenCoverageCommand(r: CommandBuilder) {
  r.command('openCoverage', (o) => {
    o.description('Open the coverage report in the browser.')
    o.aliases('oc')
    o.argument('[package]', 'The name of the package.')
    o.action(verifyCorrectDirectory(openCoverage))
    o.usageExamples(
      { command: 'rman open-coverage', description: 'Open coverage report.' },
      { command: 'rman open-coverage my-package', description: "Open coverage report for 'my-package'." }
    )
  })
}

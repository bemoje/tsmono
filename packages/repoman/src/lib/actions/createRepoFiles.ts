import path from 'path'
import { Any, readJsonFileSafeSync, removeFileSync, writeFileSafeSync, writeJsonFileSafeSync } from '@bemoje/util'
import { getPackages } from '../util/getPackages'
import { PackageDataView } from '../util/PackageDataView'

export function createRepoFiles(names: string[]) {
  getPackages(names).forEach((o) => {
    const config: Any = readJsonFileSafeSync(o.rootdirPath('repoman.config.json'))
    if (!config) throw new Error('Missing repoman.config.json')

    const pkgRepoRoot = readJsonFileSafeSync(path.join(process.cwd(), 'package.json')) || {}
    const curPkgRepo = o.packageJson
    const pkgRepo = createPackageJsonRepo(config, curPkgRepo)

    writeJsonFileSafeSync(o.packageJsonPath, pkgRepo, { spaces: 2 })
    writeJsonFileSafeSync(o.projectJsonPath, createProjectJson(config), { spaces: 2 })
    writeJsonFileSafeSync(o.tsconfigPath, createTsConfigJson(config), { spaces: 2 })
    writeJsonFileSafeSync(o.tsconfigSpecPath, createTsConfigSpecJson(config), { spaces: 2 })
    writeJsonFileSafeSync(o.rootdirPath('.eslintrc.json'), createEslintrcJson(config), { spaces: 2 })
    writeFileSafeSync(o.rootdirPath('jest.config.ts'), createJestConfigTs(config))

    if (config.npm.publish) {
      writeJsonFileSafeSync(
        o.distsPath(config.name, 'package.json'),
        createPackageJsonNpm(config, pkgRepoRoot, pkgRepo),
        {
          spaces: 2,
        }
      )
      createDistBinDir(o.distsPath(config.name, 'bin', 'index.js'))
    }

    deleteIrrelevantFiles(o)
  })
}

function createPackageJsonRepo(config: Any, curPkgRepo: Any = {}) {
  const pkgRepo: Any = {}
  const buildScriptBase = (dir: string) =>
    `rimraf ../../dist/packages/${config.name}/${dir} && npx tsc src/index.ts --outDir ../../dist/packages/${config.name}/${dir} --lib es2022 --moduleResolution node --downlevelIteration --esModuleInterop --target ES2022 --allowSyntheticDefaultImports --moduleResolution node --sourceMap`
  pkgRepo.name = '@bemoje/' + config.name
  pkgRepo.version = curPkgRepo.version || '0.0.1'
  pkgRepo.main = 'src/index.ts'
  pkgRepo.types = 'src/index.ts'
  pkgRepo.scripts = curPkgRepo.scripts || {}
  if (config.npm.publish) {
    pkgRepo.scripts['build'] = 'npm run build:cjs'
    pkgRepo.scripts['build:cjs'] = buildScriptBase('cjs') + ' --module commonjs --declaration --declarationMap'
    if (!config.npm.bin) {
      pkgRepo.scripts['build:esm'] = buildScriptBase('esm') + ' --module es2022'
      pkgRepo.scripts['build'] += ' && npm run build:esm'
    }
    if (pkgRepo.scripts['build:types']) {
      delete pkgRepo.scripts['build:types']
    }
  }
  pkgRepo.dependencies = curPkgRepo.dependencies || {}
  pkgRepo.devDependencies = curPkgRepo.devDependencies || {}
  return pkgRepo
}

function createPackageJsonNpm(config: Any, pkgRepoRoot: Any, pkgRepo: Any) {
  const pkgNpm: Any = {}
  if (config.npm.publish) {
    pkgNpm.name = config.npm.name
    pkgNpm.version = pkgRepo.version
    pkgNpm.type = 'commonjs'
    pkgNpm.main = 'cjs/index.js'
    if (!config.npm.bin) {
      pkgNpm.module = 'esm/index.js'
    }
    pkgNpm.types = 'cjs/index.d.ts'
    if (config.npm.bin) {
      pkgNpm.bin = {}
      pkgNpm.bin[config.npm.bin] = './bin/index.js'
      pkgNpm.preferGlobal = true
      pkgNpm.dependencies = pkgRepo.dependencies
    }
    pkgNpm.license = config.npm.license
    pkgNpm.keywords = config.npm.keywords
    pkgNpm.author = pkgRepoRoot.author
    pkgNpm.repository = pkgRepoRoot.repository
    pkgNpm.funding = pkgRepoRoot.funding
    pkgNpm.bugs = pkgRepoRoot.bugs
    pkgNpm.homepage = pkgRepoRoot.homepage
  }
  return pkgNpm
}

function createDistBinDir(distPath: string) {
  writeFileSafeSync(distPath, ['#!/usr/bin/env node', "require('../cjs/index.js').main();"].join('\n'))
}

function createProjectJson(config: Any) {
  const obj: Any = {
    name: config.name,
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    sourceRoot: `packages/${config.name}/src`,
    projectType: config.type,
    targets: {
      lint: {
        executor: '@nx/linter:eslint',
        outputs: ['{options.outputFile}'],
        options: {
          lintFilePatterns: [`packages/${config.name}/**/*.ts`, `packages/${config.name}/package.json`],
        },
      },
      test: {
        executor: '@nx/jest:jest',
        outputs: ['{workspaceRoot}/coverage/{projectRoot}'],
        options: {
          jestConfig: `packages/${config.name}/jest.config.ts`,
          passWithNoTests: true,
        },
        configurations: {
          ci: {
            ci: true,
            codeCoverage: true,
          },
        },
      },
    },
    tags: [],
  }
  if (config.npm.publish) {
    obj.targets.build = {
      executor: 'nx:run-script',
      outputs: ['{options.outputPath}'],
      options: {
        script: 'build',
        project: `packages/${config.name}/package.json`,
      },
    }
  }
  return obj
}

function createTsConfigJson(config: Any) {
  return {
    extends: '../../tsconfig.json',
    compilerOptions: {},
    files: [],
    include: [],
    references: [],
  }
}

function createTsConfigSpecJson(config: Any) {
  return {
    extends: './tsconfig.json',
    compilerOptions: {
      outDir: '../../dist/out-tsc',
      types: ['jest', 'node'],
    },
    include: ['jest.config.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.d.ts'],
  }
}

function createEslintrcJson(config: Any) {
  return {
    extends: ['../../.eslintrc.json'],
    ignorePatterns: ['!**/*'],
    overrides: [
      {
        files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
        rules: {},
      },
      {
        files: ['*.ts', '*.tsx'],
        rules: {},
      },
      {
        files: ['*.js', '*.jsx'],
        rules: {},
      },
      {
        files: ['*.json'],
        parser: 'jsonc-eslint-parser',
        rules: {},
      },
    ],
  }
}

function createJestConfigTs(config: Any) {
  return [
    `export default {`,
    `  displayName: '${config.name}',`,
    `  preset: '../../jest.preset.js',`,
    `  moduleFileExtensions: ['ts', 'js', 'html'],`,
    `  testEnvironment: 'node',`,
    `  coverageDirectory: '../../coverage/packages/${config.name}',`,
    `}`,
  ].join('\n')
}

function deleteIrrelevantFiles(o: PackageDataView) {
  const filenames = ['.swcrc', 'tsconfig.lib.json']
  for (const filename of filenames) {
    removeFileSync(o.rootdirPath(filename))
  }
}

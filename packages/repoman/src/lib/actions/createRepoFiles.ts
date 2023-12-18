import colors from 'ansi-colors'
import { Any, removeFileSync, writeFileSafeSync, writeJsonFileSafeSync } from '@bemoje/util'
import { existsSync } from 'fs'
import { getPackages } from '../util/getPackages'
import { PackageDataView } from '../util/PackageDataView'

export function createRepoFiles(names: string[]) {
  getPackages(names.length ? names : undefined).forEach((o) => {
    if (!existsSync(o.repomanConfigJsonPath)) {
      return console.error(colors.red(o.name + ' missing repoman.config.json'))
    }

    createPackageJsonRepo(o)
    createProjectJson(o)
    createTsConfigJson(o)
    createTsConfigSpecJson(o)
    createTsConfigLibJson(o)
    createEslintrcJson(o)
    createJestConfigTs(o)
    deleteIrrelevantFiles(o)
  })
}

function createPackageJsonRepo(o: PackageDataView) {
  const config = o.repomanConfigJson
  const curPkgRepo = o.packageJson
  const pkgRepo: Any = {}
  const buildScriptBase = (dir: string) =>
    `rimraf ../../dist/packages/${config.name}/${dir} && npx tsc src/index.ts --outDir ../../dist/packages/${config.name}/${dir} --lib esnext --moduleResolution node --downlevelIteration --esModuleInterop --target es2022 --allowSyntheticDefaultImports --skipLibCheck --importHelpers --moduleResolution node --sourceMap`

  pkgRepo.name = '@bemoje/' + config.name
  pkgRepo.version = curPkgRepo.version || '0.0.1'
  // pkgRepo.main = 'src/index.ts'
  // pkgRepo.types = 'src/index.ts'
  pkgRepo.scripts = {}
  if (config.npm.publish) {
    // pkgRepo.scripts['build'] = 'npm run build:cjs'
    pkgRepo.scripts['build'] = buildScriptBase('cjs') + ' --module commonjs --declaration --declarationMap'
    if (!config.npm.bin) {
      // pkgRepo.scripts['build:esm'] = buildScriptBase('esm') + ' --module es2022'
      // pkgRepo.scripts['build'] += ' && npm run build:esm'
    }
    if (pkgRepo.scripts['build:types']) {
      delete pkgRepo.scripts['build:types']
    }
  }
  pkgRepo.dependencies = curPkgRepo.dependencies || {}
  pkgRepo.devDependencies = curPkgRepo.devDependencies || {}
  writeJsonFileSafeSync(o.packageJsonPath, pkgRepo, { spaces: 2 })
}

function createProjectJson(o: PackageDataView) {
  const config = o.repomanConfigJson
  const obj: Any = {
    name: config.name,
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    root: `packages/${config.name}`,
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
  writeJsonFileSafeSync(o.projectJsonPath, obj, { spaces: 2 })
}

function createTsConfigJson(o: PackageDataView) {
  writeJsonFileSafeSync(
    o.tsconfigPath,
    {
      extends: '../../tsconfig.json',
      compilerOptions: {
        outDir: '../../dist/tsc-out',
      },
      files: [],
      include: [],
      references: [
        {
          path: './tsconfig.lib.json',
        },
        {
          path: './tsconfig.spec.json',
        },
      ],
    },
    { spaces: 2 }
  )
}

function createTsConfigLibJson(o: PackageDataView) {
  writeJsonFileSafeSync(
    o.tsconfigLibPath,
    {
      extends: './tsconfig.json',
      compilerOptions: {},
      include: ['src/**/*.ts'],
      exclude: ['jest.config.ts', 'src/**/*.spec.ts', 'src/**/*.test.ts'],
    },
    { spaces: 2 }
  )
}

function createTsConfigSpecJson(o: PackageDataView) {
  writeJsonFileSafeSync(
    o.tsconfigSpecPath,
    {
      extends: './tsconfig.json',
      compilerOptions: {
        types: ['jest', 'node'],
      },
      include: ['jest.config.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts', 'src/**/*.d.ts'],
    },
    { spaces: 2 }
  )
}

function createEslintrcJson(o: PackageDataView) {
  writeJsonFileSafeSync(
    o.eslintrcJsonPath,
    {
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
    },
    { spaces: 2 }
  )
}

function createJestConfigTs(o: PackageDataView) {
  const config = o.repomanConfigJson
  writeFileSafeSync(
    o.jestConfigJsonPath,
    [
      `export default {`,
      `  displayName: '${config.name}',`,
      `  preset: '../../jest.preset.js',`,
      `  moduleFileExtensions: ['ts', 'js', 'html'],`,
      `  testEnvironment: 'node',`,
      `  coverageDirectory: '../../coverage/packages/${config.name}',`,
      `}`,
    ].join('\n')
  )
}

function deleteIrrelevantFiles(o: PackageDataView) {
  const filenames = ['.swcrc']
  for (const filename of filenames) {
    removeFileSync(o.rootdirPath(filename))
  }
}

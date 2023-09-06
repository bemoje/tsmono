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
import { lint } from './lib/lint'
import { packageDependencies } from './lib/packageDependencies'
import { prepub } from './lib/prepub'
import { publish } from './lib/publish'
import { rehash } from './lib/rehash'
import { test } from './lib/test'
import { wipeBemojeNodeModules } from './lib/wipeBemojeNodeModules'

const cwd = process.cwd()
const args = process.argv.slice(2)
const cmd = args.shift()

function main() {
  if (!cmd) return
  else if (cmd === 'createPackage') createPackage(args)
  else if (cmd === 'deletePackage') deletePackage(args)
  else if (cmd === 'packageDependencies') packageDependencies()
  else if (cmd === 'rehash') rehash()
  else if (cmd === 'fixReadmes') fixReadmes()
  else if (cmd === 'fixTsConfigIncludes') fixTsConfigIncludes()
  else if (cmd === 'fixDependencies') fixDependencies()
  else if (cmd === 'fixEntryPoints') fixEntryPoints()
  else if (cmd === 'fixPackageJson') fixPackageJson()
  else if (cmd === 'fixAll') fixAll()
  else if (cmd === 'forEach') forEach(args)
  else if (cmd === 'wipeBemojeNodeModules') wipeBemojeNodeModules(args)
  else if (cmd === 'lint') lint(args)
  else if (cmd === 'test') test(args)
  else if (cmd === 'build') build(args)
  else if (cmd === 'docs') docs()
  else if (cmd === 'prepub') prepub(args)
  else if (cmd === 'publish') publish(args)
  else console.log('unknown command:', cmd)
}

main()

/*
"ts": "ts-node -P tsconfig.json",
"script": "ts-node -P tsconfig.scripts.json",
"create-package": "ts-node -P tsconfig.scripts.json scripts/createPackage.ts",
"delete-package": "ts-node -P tsconfig.scripts.json scripts/deletePackage.ts",
"package-dependencies": "ts-node -P tsconfig.scripts.json scripts/packageDependencies.ts",
"rehash": "ts-node -P tsconfig.scripts.json scripts/rehash.ts",
"fix-readmes": "ts-node -P tsconfig.scripts.json scripts/fixReadmes.ts",
"fix-tsconfig-includes": "ts-node -P tsconfig.scripts.json scripts/fixTsConfigIncludes.ts",
"fix-dependencies": "ts-node -P tsconfig.scripts.json scripts/fixDependencies.ts",
"fix-entrypoints": "ts-node -P tsconfig.scripts.json scripts/fixEntryPoints.ts",
"fix-package-json": "ts-node -P tsconfig.scripts.json scripts/fixPackageJson.ts",
"fix-all": "ts-node -P tsconfig.scripts.json scripts/fixAll.ts",
"foreach": "ts-node -P tsconfig.scripts.json scripts/forEach.ts",
"wipe-bemoje-modules": "ts-node -P tsconfig.scripts.json scripts/wipeBemojeNodeModules.ts",
"lint": "ts-node -P tsconfig.scripts.json scripts/lint.ts",
"test": "ts-node -P tsconfig.scripts.json scripts/test.ts",
"build": "ts-node -P tsconfig.scripts.json scripts/build.ts",
"tsdoc": "rimraf ./docs/ && typedoc --out ./docs/ --entryPoints ./packages/index.ts",
"docs": "ts-node -P tsconfig.scripts.json scripts/docs.ts",
"prepub": "ts-node -P tsconfig.scripts.json scripts/prepub.ts",
"publish": "ts-node -P tsconfig.scripts.json scripts/publish.ts",
"opendocs": "start docs/modules.html"
*/

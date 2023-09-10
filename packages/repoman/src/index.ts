import { getAppDataPath } from '@bemoje/util'
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
import { lint } from './lib/lint'
import { openDocs } from './lib/openDocs'
import { packageDependencies } from './lib/packageDependencies'
import { prepub } from './lib/prepub'
import { publish } from './lib/publish'
import { rehash } from './lib/rehash'
import { script } from './lib/script'
import { test } from './lib/tests'
import { ts } from './lib/ts'
import { wipeBemojeNodeModules } from './lib/wipeBemojeNodeModules'

const appdata = getAppDataPath('bemoje', 'repoman')
fs.mkdirSync(appdata, { recursive: true })
const fpath = path.join(appdata, 'repo.txt')
if (!fs.existsSync(fpath)) {
  fs.writeFileSync(fpath, process.cwd(), 'utf8')
}
console.log(fpath)
const cwd = fs.readFileSync(fpath, 'utf8').trim()
if (cwd !== process.cwd()) process.chdir(cwd)

const args = process.argv.slice(2)
const cmd = args.shift()?.toLowerCase().replace(/-/g, '')

function main() {
  if (!cmd) return
  else if (cmd === 'ts'.toLowerCase()) ts(args)
  else if (cmd === 'script'.toLowerCase()) script(args)
  else if (cmd === 'createPackage'.toLowerCase()) createPackage(args)
  else if (cmd === 'deletePackage'.toLowerCase()) deletePackage(args)
  else if (cmd === 'packageDependencies'.toLowerCase()) packageDependencies()
  else if (cmd === 'rehash'.toLowerCase()) rehash()
  else if (cmd === 'fixReadmes'.toLowerCase()) fixReadmes()
  else if (cmd === 'fixTsConfigIncludes'.toLowerCase()) fixTsConfigIncludes()
  else if (cmd === 'fixDependencies'.toLowerCase()) fixDependencies()
  else if (cmd === 'fixEntryPoints'.toLowerCase()) fixEntryPoints()
  else if (cmd === 'fixPackageJson'.toLowerCase()) fixPackageJson()
  else if (cmd === 'fixAll'.toLowerCase()) fixAll()
  else if (cmd === 'forEach'.toLowerCase()) forEach(args)
  else if (cmd === 'wipeBemojeNodeModules'.toLowerCase()) wipeBemojeNodeModules(args)
  else if (cmd === 'lint'.toLowerCase()) lint(args)
  else if (cmd === 'test'.toLowerCase()) test(args)
  else if (cmd === 'build'.toLowerCase()) build(args)
  else if (cmd === 'docs'.toLowerCase()) docs()
  else if (cmd === 'prepub'.toLowerCase()) prepub(args)
  else if (cmd === 'publish'.toLowerCase()) publish(args)
  else if (cmd === 'opendocs'.toLowerCase()) openDocs()
  else console.log('unknown command:', cmd)
}

main()

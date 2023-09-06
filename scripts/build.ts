import { executeBatchScript } from '../packages/node/src/lib/virtual-script/executeBatchScript'
import { fixDependencies } from './util/fixDependencies'
import { fixEntryPoints } from './util/fixEntryPoints'
import { fixReadmes } from './util/fixReadmes'

const names = process.argv.slice(2)

fixEntryPoints()
fixDependencies()
fixReadmes()

executeBatchScript(['nx run-many -t "build"' + (names.length ? ' -p ' + names.join(',') : '')])

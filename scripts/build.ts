import { execBatch } from '../packages/node/src/lib/execBatch'
const names = process.argv.slice(2)

execBatch(['nx run-many -t "build"' + (names.length ? ' -p ' + names.join(',') : '')])

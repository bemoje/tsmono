import { execBatch } from '../packages/node/src/lib/execBatch'
const names = process.argv.slice(2)

execBatch(['nx run-many -t lint' + (names.length ? ' -p ' + names.join(',') : '')])

import { execBatch } from '../pkg/node/src/lib/execBatch'
const names = process.argv.slice(2)

execBatch(['nx run-many --parallel 4 -t test' + (names.length ? ' -p ' + names.join(',') : '')])

import { execBatch } from './util/execBatch'
const names = process.argv.slice(2)

execBatch(['nx run-many -t test' + (names.length ? ' -p ' + names.join(',') : '')])

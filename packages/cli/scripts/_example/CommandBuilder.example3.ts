import { CLI } from '../../src/cmd/CLI'
import { printCounts } from '../../src/core/counter'

console.time('load')

const init = CLI('demo', (c) => {
  c.argument('[arg1...]')
  c.argument('[arg2]')
  c.action((arg1, arg2, arg3) => {
    console.log({ arg1, arg2, arg3 })
  })
})
console.timeEnd('load')

console.time('init')
const cli = init()
console.timeEnd('init')

console.time('exec')
cli.parse()
console.timeEnd('exec')

printCounts()

import { CLI } from './CLI'

console.time('init')

const cli = CLI('demo', (c) => {
  c.version('0.0.1')
  c.description('A CLI example')
  c.enableBuiltinOptions()
  // c.action(async () => {
  //   //
  // })
  c.command('nothing', (n) => {
    n
  })
  c.option('--opt1', 'opt1')
  c.option('--opt2', 'opt2')
  c.option('--opt3', 'opt3')
  c.action(async () => {
    c.$.setOptionValue('opt1', false)
    console.log(c.$.opts())
  })
})

cli().parseAsync()

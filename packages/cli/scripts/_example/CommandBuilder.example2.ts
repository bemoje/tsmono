import { CommandBuilder } from '../../src/cmd/CommandBuilder'

console.time('load')
const cli = new CommandBuilder('demo', (c) => {
  c.version('0.0.1')
  c.description('A CLI example')
  c.setRecommended()
  c.command('nothing', function (this: CommandBuilder) {
    this.features
  })
  c.option('--opt1', 'opt1')
  c.option('--opt2', 'opt2')
  c.action((opts, cmd) => {
    cmd.db.appData.update('count1', (c: number) => c + 1)
    console.log(cmd.db.appData.get())
  })

  c.appData('count1', { defaultValue: 0 })
  c.appData('count2', { defaultValue: 0 })
  console.log(c.dataFilepath)
})
console.timeEnd('load')

function example() {
  console.time('exec')
  cli.$.parse()
  console.timeEnd('exec')
}

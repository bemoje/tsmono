import { CommandBuilder } from '../../src/cmd/CommandBuilder'
import { isBoolean, parseBoolean } from '@bemoje/util'
console.time('load')

const cli = new CommandBuilder('demo', (c) => {
  c.version('0.0.1')
  c.description('A CLI example')
  c.setRecommended()
  // c.action(() => {})

  c.command('hello', (h) => {
    h.alias('he')
    h.description('just prints hello')
    h.argument('[name]')
    h.action((name?: string) => {
      console.log('hello ' + name)
    })
    h.preset('benja', {
      description: 'Benjamin',
      args: ['Benjamin'],
    })
    h.preset('thomas', {
      description: 'Thomas',
      args: ['Thomas'],
    })
  })

  c.command('info', (i) => {
    i.description('enter info about yourself')
    i.argument('[name]', (a) => {
      a.description('Your name')
    })

    i.argument('[friends]', (a) => {
      a.description('Comma-delimited list of friends')
      a.parser.delimitedStrings(',')
      a.validator.isStringArray()
    })

    i.argument('[nums...]', (a) => {
      a.description('Your favorite numbers between 0 and 4')
      a.choices(['0', '1', '2', '3', '4'])
      a.parser.integer()
      a.validator.isIntegerArray()
    })

    i.option('--age [years]', (o) => {
      o.description('Your age in years.')
      o.parser.integer()
      o.validator.isInteger()
      o.validator.custom(function isAdult(age: unknown) {
        return (age as number) >= 18
      })
    })

    i.action((name, friends, nums, opts) => {
      console.log({ name, friends, nums, ...opts })
    })

    i.config('inSchool', {
      description: 'whether you are attending school',
      defaultValue: true,
      parse: parseBoolean,
      validate: isBoolean,
    })

    i.preset('benjabob', {
      description: 'Benjamin',
      presets: ['old'],
      args: ['Benjamin', ['Thomas', 'Lasse']],
      options: { age: 35 },
    })
    i.preset('adult', {
      description: 'Age is 18',
      options: { age: 18 },
    })
    i.preset('old', {
      description: 'Age is 35',
      options: { age: 35 },
    })
  })

  c.command('nothing', (n) => {
    n
  })
})

function example() {
  console.timeEnd('load')
  console.time('exec')
  cli.$.parse()
  console.timeEnd('exec')
}

example()

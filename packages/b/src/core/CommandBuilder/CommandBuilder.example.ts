import { CommandBuilder } from './CommandBuilder'
import { isBoolean } from '../../validators/isBoolean'
import { parseBoolean } from '../../parsers/parseBoolean'

const cli = new CommandBuilder('cli', (cli) => {
  cli.description('A CLI example')

  cli.argument('[name]', (a) => {
    a.description('Your name')
    a.parser.string()
    a.validator.isString()
  })

  cli.argument('[friends]', (a) => {
    a.description('Comma-delimited list of friends')
    a.parser.delimitedStrings(',')
    a.validator.isStringArray()
  })

  cli.argument('[favNumbers...]', (a) => {
    a.description('Your favorite numbers between 0 and 4')
    a.choices(['0', '1', '2', '3', '4'])
    a.parser.integer()
    a.validator.isIntegerArray()
  })

  cli.option('--age [years]', (o) => {
    o.description('Your age in years.')
    o.parser.integer()
    o.validator.isInteger()
    o.validator.custom(function isAdult(age: number) {
      return age >= 18
    })
  })

  cli.action(async (name, friends, favNumbers, opts) => {
    console.log({ name, friends, favNumbers, ...opts })
  })

  cli.command('hello', (cmd) => {
    cmd.description('prints hello')
    cmd.argument('[first]')
    cmd.argument('[last]')
    cmd.action(async (name?: string) => {
      console.log('hello ' + name)
    })
    cmd.preset('benja', {
      description: 'Benjamin',
      args: ['Benjamin'],
    })
    cmd.preset('thomas', {
      description: 'Thomas',
      args: ['Thomas'],
    })
  })

  cli.command('nothing', (cmd) => {
    cmd.description('no action. should print help by default')
  })

  cli.config('inSchool', {
    description: 'whether you are attending school',
    defaultValue: true,
    parse: parseBoolean,
    validate: isBoolean,
  })

  cli.preset('benja', {
    description: 'Benjamin',
    presets: ['old'],
    args: ['Benjamin', ['Thomas', 'Lasse'], [0, 3]],
  })
  cli.preset('adult', {
    description: 'Age is 18',
    options: { age: 18 },
  })
  cli.preset('old', {
    description: 'Age is 35',
    options: { age: 35 },
  })
})

const main = cli.exportMain()

///////////////////

// main('Michael Anna,Mark,David 1 0 4 --age 21 --trace').catch(console.error)
main().catch(console.error)

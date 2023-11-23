import { CommandBuilder } from './CommandBuilder'
import { parseBoolean } from '../../parsers/parseBoolean'
import { prefixStringsRecursive } from '../util/prefixStringsRecursive'

const cli = new CommandBuilder('cli', (cli) => {
  cli.description('A CLI example')

  cli.action(async (args, opts) => {
    const name = args.shift()
    const friends = args.shift()
    const favNumbers = args
    console.log({ name, friends, favNumbers, ...opts })
  })

  cli.argument('<name>', (a) => {
    a.description('Your name')
  })

  cli.argument('[friends]', (a) => {
    a.description('Comma-delimited list of friends')
    a.parser.delimitedStrings(',')
  })

  cli.argument('[favNumbers...]', (a) => {
    a.description('Your favorite numbers between 0 and 4')
    a.parser.integer()
    a.choices(['0', '1', '2', '3', '4'])
  })

  cli.option('-a, --age [years]', (o) => {
    o.description('Your age in years.')
    o.parser.integer()
    o.validator.isInteger()
    o.validator.custom(function isAdult(age: number) {
      return age >= 18
    })
  })

  cli.command('hello', (cmd) => {
    cmd.description('prints hello')
    cmd.action(async () => {
      console.log('hello')
    })
  })

  cli.config<boolean>({
    key: 'inSchool',
    description: 'whether you are attending school',
    defaultValue: true,
    parse: parseBoolean,
    validate: null,
  })

  cli.preset('benjamin', {
    description: 'Benjamin',
    presets: ['old'],
    args: ['', 'Thomas,Lasse', '0', '3'],
    options: {},
  })
  cli.preset('adult', {
    description: 'Age is 18',
    presets: [],
    args: [],
    options: { age: 18 },
  })
  cli.preset('old', {
    description: 'Age is 35',
    presets: [],
    args: [],
    options: { age: 35 },
  })

  console.log({ filepath: cli.filepath })
})

const main = cli.exportMain()

///////////////////

// main('Michael Anna,Mark,David 1 0 4 --age 21 --trace').catch(console.error)
main().catch(console.error)

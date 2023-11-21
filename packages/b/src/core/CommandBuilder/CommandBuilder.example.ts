import { CommandBuilder } from './CommandBuilder'
import { parseBoolean } from '../../parsers/parseBoolean'
import { parseInteger } from '../../parsers/parseInteger'
import { parseString } from '../../parsers/parseString'

const cli = new CommandBuilder('cli', (cli) => {
  cli.description('A CLI example')

  cli.argument('<name>', (a) => {
    a.description('Your name')
  })

  cli.argument('[friends]', (a) => {
    a.description('Comma-delimited list of friends')
    a.setParser.delimitedStrings(',')
  })

  cli.argument('[favNumbers...]', (a) => {
    a.description('Your favorite numbers between 0 and 4')
    a.setParser.integer()
    a.choices(['0', '1', '2', '3', '4'])
  })

  cli.option('-a, --age [years]', (o) => {
    o.description('Your age in years.')
    o.parser.integer()
  })

  cli.command('someSubCommand', (cmd) => cmd.description('A subcommand'))

  cli.config<string>({
    key: 'name',
    description: 'your name',
    defaultValue: null,
    parse: parseString,
    validate: null,
  })

  cli.config<number>({
    key: 'age',
    description: 'your age',
    defaultValue: null,
    parse: parseInteger,
    validate: function isAdult(age: number) {
      return age >= 18
    },
  })

  cli.config<boolean>({
    key: 'inSchool',
    description: 'whether you are attending school',
    defaultValue: true,
    parse: parseBoolean,
    validate: null,
  })

  cli.preset('adult', {
    summary: 'Age is 18',
    presets: [],
    args: [],
    options: { age: 18 },
  })
  cli.preset('old', {
    summary: 'Age is 35',
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

/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { CommandBuilder } from '../cmd/CommandBuilder'
import { OptionArgumentValidatorSelector } from './OptionArgumentValidatorSelector'
import { OptionBuilder } from './OptionBuilder'
import { OutputManager } from '../core/OutputManager'

describe(OptionArgumentValidatorSelector.name, () => {
  jest.spyOn(process, 'exit').mockImplementation((code?: number) => {
    throw new Error('process.exit(' + code ?? '' + ') was called')
  })

  it('should return a OptionArgumentValidatorSelector instance', () => {
    const arg = new OptionBuilder(new CommandBuilder('t'), '[arg]')
    expect(arg.validator).toBeInstanceOf(OptionArgumentValidatorSelector)
  })

  it('should validate string, number, integer', () => {
    const run = new CommandBuilder('t', (c) => {
      c.option('--s <str>', (o) => o.parser.string().validator.isString())
      c.option('--n <num>', (o) => o.parser.number().validator.isNumber())
      c.option('--i <int>', (o) => o.parser.integer().validator.isInteger())
      c.action(() => {})
    })
    expect(() => run.$.parse('--s str --n 3.2 --i 3'.split(' '), { from: 'user' })).not.toThrow()
  })

  it('should throw if invalid', () => {
    const run = new CommandBuilder('t', (c) => {
      c.throwInsteadOfProcessExit()
      c.option('--i <int>', (a) => a.parser.number().validator.isInteger())
      c.action(() => {})
      c.throwInsteadOfProcessExit()
    })
    expect(() => run.$.parse('--i 3.2'.split(' '), { from: 'user' })).toThrow()
  })

  it('should validate delimited string, number, integer', () => {
    const run = new CommandBuilder('t', (c) => {
      c.option('--s <strs>', (o) => o.parser.delimitedStrings().validator.isStringArray())
      c.option('--n <nums>', (o) => o.parser.delimitedNumbers().validator.isNumberArray())
      c.option('--i <ints>', (o) => o.parser.delimitedIntegers().validator.isIntegerArray())
      c.action(() => {})
    })
    run.$.parse('--s a,b --n 3.1,4.1 --i 3,4,5'.split(' '), { from: 'user' })
  })

  it('should validate variadic argument', () => {
    const run = new CommandBuilder('t', (c) => {
      c.option('--i <ints...>', (o) => o.parser.integer().validator.isIntegerArray())
      c.option('--s <str>', (o) => o.validator.isString())
      c.action(() => {})
    })
    expect(() => run.$.parse('--i 3 4 5 --s abc'.split(' '), { from: 'user' })).not.toThrow()
  })

  it('should throw if invalid', () => {
    const run = new CommandBuilder('t', (c) => {
      c.option('--i <ints>', (a) => a.parser.delimitedIntegers().validator.isIntegerArray())
      c.action(() => {})
      c.throwInsteadOfProcessExit()
      OutputManager.getInstance().stderr.disable()
    })
    expect(() => run.$.parse(['--i 3,q,7'], { from: 'user' })).toThrow()
  })

  it('should validate with custom validator', () => {
    const run = new CommandBuilder('t', (c) => {
      c.option('--a <arg>', (a) => a.validator.custom((arg) => arg === 'abc'))
      c.action(() => {})
      c.throwInsteadOfProcessExit()
    })
    expect(() => run.$.parse('--a ab'.split(' '), { from: 'user' })).toThrow()
  })

  it('should validate with multiple validators', () => {
    const run = new CommandBuilder('t', (c) => {
      c.option('--a <arg>', (a) => {
        a.validator.custom((arg: string) => arg !== 'abc')
        a.validator.custom((arg: string) => arg.length >= 3)
      })
      c.action(() => {})
      c.throwInsteadOfProcessExit()
    })
    expect(() => run.$.parse('--a ab'.split(' '), { from: 'user' })).toThrow()
    expect(() => run.$.parse('--a abc'.split(' '), { from: 'user' })).toThrow()
    expect(() => run.$.parse('--a abcd'.split(' '), { from: 'user' })).not.toThrow()
  })
})

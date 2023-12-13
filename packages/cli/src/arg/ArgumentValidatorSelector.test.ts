/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ArgumentValidatorSelector } from './ArgumentValidatorSelector'
import { CommandBuilder } from '../cmd/CommandBuilder'

describe(ArgumentValidatorSelector.name, () => {
  jest.spyOn(process, 'exit').mockImplementation((code?: number) => {
    throw new Error('process.exit(' + code ?? '' + ') was called')
  })

  it('should validate string, number, integer', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<str>', (a) => a.parser.string().validator.isString())
      c.argument('<num>', (a) => a.parser.number().validator.isNumber())
      c.argument('<int>', (a) => a.parser.integer().validator.isInteger())
      c.action(() => {})
    })
    expect(() => run.$.parse(['str', '3.2', '3'], { from: 'user' })).not.toThrow()
  })

  it('should throw if invalid', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<int>', (a) => a.parser.number().validator.isInteger())
      c.action(() => {})
      c.throwInsteadOfProcessExit()
    })
    expect(() => run.$.parse(['3.2'], { from: 'user' })).toThrow()
  })

  it('should validate delimited string, number, integer', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<strs>', (a) => a.parser.delimitedStrings().validator.isStringArray())
      c.argument('<nums>', (a) => a.parser.delimitedNumbers().validator.isNumberArray())
      c.argument('<ints>', (a) => a.parser.delimitedIntegers().validator.isIntegerArray())
      c.action(() => {})
    })
    expect(() => run.$.parse(['a,b', '3.1,4.1', '3,4,5'], { from: 'user' })).not.toThrow()
  })

  it('should validate variadic argument', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<str>', (o) => o.validator.isString())
      c.argument('<ints...>', (o) => o.parser.integer().validator.isIntegerArray())
      c.action(() => {})
    })
    expect(() => run.$.parse('abc 3 4 5'.split(' '), { from: 'user' })).not.toThrow()
  })

  it('should throw if invalid', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<ints>', (a) => a.parser.delimitedIntegers().validator.isIntegerArray())
      c.action(() => {})
      c.throwInsteadOfProcessExit()
    })
    expect(() => run.$.parse(['3,q,7'], { from: 'user' })).toThrow()
  })

  it('should validate with custom validator', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<arg>', (a) => a.validator.custom((arg) => arg === 'abc'))
      c.action(() => {})
      c.throwInsteadOfProcessExit()
    })
    expect(() => run.$.parse(['ab'], { from: 'user' })).toThrow()
  })

  it('should validate with multiple validators', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<arg>', (a) => {
        a.validator.custom((arg: string) => arg !== 'abc')
        a.validator.custom((arg: string) => arg.length >= 3)
      })
      c.action(() => {})
      c.throwInsteadOfProcessExit()
    })
    expect(() => run.$.parse(['ab'], { from: 'user' })).toThrow()
    expect(() => run.$.parse(['abc'], { from: 'user' })).toThrow()
    expect(() => run.$.parse(['abcd'], { from: 'user' })).not.toThrow()
  })
})

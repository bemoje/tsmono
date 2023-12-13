import { ArgumentParserSelector } from './ArgumentParserSelector'
import { CommandBuilder } from '../cmd/CommandBuilder'

describe(ArgumentParserSelector.name, () => {
  it('should parse string, number, integer', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<str>', (a) => a.parser.string())
      c.argument('<num>', (a) => a.parser.number())
      c.argument('<int>', (a) => a.parser.integer())
      c.action((str, num, int) => {
        expect(str).toBe('str')
        expect(num).toBe(3.2)
        expect(int).toBe(3)
      })
    })
    run.$.parse(['str', '3.2', '3'], { from: 'user' })
  })

  it('should parse variadic argument', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<str>', (o) => o.parser.string())
      c.argument('<ints...>', (o) => o.parser.integer())
      c.action((str, ints) => {
        expect(ints).toEqual([3, 4, 5])
      })
    })
    run.$.parse('abc 3 4 5'.split(' '), { from: 'user' })
  })

  it('should parse delimited string, number, integer', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<strs>', (a) => a.parser.delimitedStrings())
      c.argument('<nums>', (a) => a.parser.delimitedNumbers())
      c.argument('<ints>', (a) => a.parser.delimitedIntegers())
      c.action((strs, nums, ints) => {
        expect(strs).toEqual(['a', 'b'])
        expect(nums).toEqual([3.1, 4.1])
        expect(ints).toEqual([3, 4, 5])
      })
    })
    run.$.parse(['a,b', '3.1,4.1', '3,4,5'], { from: 'user' })
  })

  it('should parse with custom parser', () => {
    const run = new CommandBuilder('t', (c) => {
      c.argument('<arg>', (a) => a.parser.custom((s) => s.split('')))
      c.action((arg) => {
        expect(arg).toEqual(['a', 'b', 'c'])
      })
    })
    run.$.parse(['abc'], { from: 'user' })
  })
})

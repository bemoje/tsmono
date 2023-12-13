import { CommandBuilder } from '../cmd/CommandBuilder'
import { OptionArgumentParserSelector } from './OptionArgumentParserSelector'

describe(OptionArgumentParserSelector.name, () => {
  it('should parse string, number, integer', () => {
    const init = new CommandBuilder('t', (c) => {
      c.option('--str <val>', (o) => o.parser.string())
      c.option('--num <val>', (o) => o.parser.number())
      c.option('--int <val>', (o) => o.parser.integer())
      c.action((opts) => {
        expect(opts.str).toBe('str')
        expect(opts.num).toBe(3.2)
        expect(opts.int).toBe(3)
      })
    })
    init.$.parse('--str str --num 3.2 --int 3'.split(' '), { from: 'user' })
  })

  it('should parse variadic option', () => {
    const init = () =>
      new CommandBuilder('t', (c) => {
        c.option('--ints <val...>', (o) => o.parser.integer())
        c.option('--str <val>', (o) => o.parser.string())
        c.action((opts) => {
          expect(opts.ints).toEqual([3, 4, 5])
        })
      })
    init().$.parse('--ints 3 4 5'.split(' '), { from: 'user' })
    init().$.parse('--ints 3 4 5 --str abc'.split(' '), { from: 'user' })
  })

  it('should parse delimited string, number, integer', () => {
    const init = new CommandBuilder('t', (c) => {
      c.option('--strs <val>', (o) => o.parser.delimitedStrings())
      c.option('--nums <val>', (o) => o.parser.delimitedNumbers())
      c.option('--ints <val>', (o) => o.parser.delimitedIntegers())
      c.action((opts) => {
        expect(opts.strs).toEqual(['a', 'b'])
        expect(opts.nums).toEqual([3.1, 4.1])
        expect(opts.ints).toEqual([3, 4, 5])
      })
    })
    init.$.parse('--strs a,b --nums 3.1,4.1 --ints 3,4,5'.split(' '), { from: 'user' })
  })

  it('should parse with custom parser', () => {
    const init = new CommandBuilder('t', (c) => {
      c.option('--chars <val>', (o) => o.parser.custom((s) => s.split('')))
      c.action((opts) => {
        expect(opts.chars).toEqual(['a', 'b', 'c'])
      })
    })
    init.$.parse('--chars abc'.split(' '), { from: 'user' })
  })
})

import { Argument } from 'commander'
import { ArgumentBuilder } from './ArgumentBuilder'
import { ArgumentParserSelector } from './ArgumentParserSelector'
import { ArgumentReader } from './ArgumentReader'
import { ArgumentValidatorSelector } from './ArgumentValidatorSelector'
import { CommandBuilder } from '../cmd/CommandBuilder'

describe(ArgumentBuilder.name, () => {
  it('should add commander argument to commander command instance', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'addArgument')
      c.argument('[arg]', (a) => {
        expect(spy).toBeCalledWith(a.$)
      })
    })
  })

  describe('constructor', () => {
    it('$ should return an Argument instance', () => {
      const o = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
      expect(o.$).toBeInstanceOf(Argument)
    })

    it('get should return an ArgumentReader instance', () => {
      const o = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
      expect(o.get).toBeInstanceOf(ArgumentReader)
    })

    it('name', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg]', (a) => {
          expect(a.$.name()).toBe('arg')
        })
      })
    })
  })

  describe('description', () => {
    it('set inside callback', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg]', (a) => {
          expect(a.description('abc')).toBe(a)
          expect(a.$.description).toBe('abc')
        })
        const arg = c.arguments[0]
        expect(arg.description).toBe('abc')
      })
    })

    it('set as second argument', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg]', 'abc')
        const arg = c.arguments[0]
        expect(arg.description).toBe('abc')
      })
    })

    it('allow no description', () => {
      new CommandBuilder('t', (c) => {
        expect(() => c.argument('[arg]')).not.toThrow()
      })
    })
  })

  describe('default', () => {
    it('should call commander default method', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg]', (a) => {
          const spy = jest.spyOn(a.$, 'default')
          expect(a.default('abc')).toBe(a)
          expect(spy).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('choices', () => {
    it('should call commander choices method', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg]', (a) => {
          const spy = jest.spyOn(a.$, 'choices')
          expect(a.choices(['a', 'b'])).toBe(a)
          expect(spy).toHaveBeenCalledWith(['a', 'b'])
        })
      })
    })
  })

  describe('parser', () => {
    it('should return a ArgumentParserSelector instance', () => {
      const arg = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
      expect(arg.parser).toBeInstanceOf(ArgumentParserSelector)
    })
  })

  describe('validator', () => {
    it('should return a ArgumentValidatorSelector instance', () => {
      const arg = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
      expect(arg.validator).toBeInstanceOf(ArgumentValidatorSelector)
    })
  })
})

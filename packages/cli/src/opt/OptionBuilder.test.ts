/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommandBuilder } from '../cmd/CommandBuilder'
import { Option } from 'commander'
import { OptionArgumentParserSelector } from './OptionArgumentParserSelector'
import { OptionArgumentValidatorSelector } from './OptionArgumentValidatorSelector'
import { OptionBuilder } from './OptionBuilder'
import { OptionHelpers } from './OptionHelpers'
import { OptionReader } from './OptionReader'

describe(OptionBuilder.name, () => {
  it('should add commander option to commander command instance', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'addOption')
      c.option('-a, --alpha [arg]', (o) => {
        expect(spy).toBeCalledWith(o.$)
      })
    })
  })

  describe('constructor', () => {
    it('should set default to true if no arg and long is negated', () => {
      expect(new OptionBuilder(new CommandBuilder('t'), '--alpha').$.defaultValue).not.toBe(true)
      expect(new OptionBuilder(new CommandBuilder('t'), '--no-alpha').$.defaultValue).toBe(true)
    })

    it('$ should return an Option instance', () => {
      const o = new OptionBuilder(new CommandBuilder('t'), '--alpha')
      expect(o.$).toBeInstanceOf(Option)
    })

    it('get should return an OptionReader instance', () => {
      const o = new OptionBuilder(new CommandBuilder('t'), '--alpha')
      expect(o.get).toBeInstanceOf(OptionReader)
    })

    it('name', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha [arg]', (o) => {
          c.option('-a, --alpha [arg]', (o) => {
            expect(o.$.name()).toBe('alpha')
          })
        })
      })
    })
  })

  describe('description', () => {
    it('set inside callback', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha [arg]', (o) => {
          o.description('abc')
          expect(o.$.description).toBe('abc')
        })
      })
    })

    it('set as second argument', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha [arg]', 'abc')
        const o = c.options.find((o) => o.long === '--alpha')
        expect(o!.description).toBe('abc')
      })
    })

    it('allow no description', () => {
      new CommandBuilder('t', (c) => {
        expect(() => c.option('-a, --alpha [arg]')).not.toThrow()
      })
    })
  })

  it('mandatory', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        const spy = jest.spyOn(o.$, 'makeOptionMandatory')
        expect(spy).not.toHaveBeenCalled()
        expect(o.mandatory()).toBe(o)
        o.mandatory(true)
        o.mandatory(false)
        expect(spy).toHaveBeenCalledTimes(3)
      })
    })
  })

  it('hideHelp', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        const spy = jest.spyOn(o.$, 'hideHelp')
        expect(spy).not.toHaveBeenCalled()
        expect(o.hideHelp()).toBe(o)
        o.hideHelp(true)
        o.hideHelp(false)
        expect(spy).toHaveBeenCalledTimes(3)
      })
    })
  })

  it('hidden', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        expect(o.hidden(true)).toBe(o)
        expect(o.$.hidden).toBe(true)
      })
    })
  })

  it('preset', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        const spy = jest.spyOn(o.$, 'preset')
        expect(spy).not.toHaveBeenCalled()
        expect(o.preset(true)).toBe(o)
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('default', () => {
    new CommandBuilder('t', (c) => {
      c.option('-a, --alpha [arg]', (o) => {
        const spy = jest.spyOn(o.$, 'default')
        o.default('abc')
        expect(o.default('abc', 'desc')).toBe(o)
        expect(spy).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe('choices', () => {
    it('should call commander choices method', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha [arg]', (o) => {
          const spy = jest.spyOn(o.$, 'choices')
          o.choices(['a', 'b'])
          expect(spy).toHaveBeenCalledWith(['a', 'b'])
        })
      })
    })

    it('should throw if has no argument', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha', (o) => {
          expect(() => o.choices(['a', 'b'])).toThrow()
        })
      })
    })
  })

  it('conflicts', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        const spy = jest.spyOn(o.$, 'conflicts')
        expect(spy).not.toHaveBeenCalled()
        o.conflicts('a')
        expect(o.conflicts(['a'])).toBe(o)
        expect(spy).toHaveBeenCalledTimes(2)
      })
    })
  })

  it('implies', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        const spy = jest.spyOn(o.$, 'implies')
        expect(spy).not.toHaveBeenCalled()
        expect(o.implies({ beta: true })).toBe(o)
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('env', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        const spy = jest.spyOn(o.$, 'env')
        expect(spy).not.toHaveBeenCalled()
        expect(o.env('ENV_VAR')).toBe(o)
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('short', () => {
    new CommandBuilder('t', (c) => {
      c.option('--alpha', (o) => {
        const spy = jest.spyOn(OptionHelpers, 'setShort')
        expect(spy).not.toHaveBeenCalled()
        expect(o.short('a')).toBe(o)
        expect(spy).toHaveBeenCalledWith(o.$, 'a')
      })
    })
  })

  describe('parser', () => {
    it('should return a OptionArgumentParserSelector instance', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha <arg>', (o) => {
          expect(o.parser).toBeInstanceOf(OptionArgumentParserSelector)
        })
      })
    })

    it('should throw if option has no argument', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha', (o) => {
          expect(() => o.parser).toThrow()
        })
      })
    })
  })

  describe('validator', () => {
    it('should return a OptionArgumentValidatorSelector instance', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha <arg>', (o) => {
          expect(o.validator).toBeInstanceOf(OptionArgumentValidatorSelector)
        })
      })
    })

    it('should throw if option has no argument', () => {
      new CommandBuilder('t', (c) => {
        c.option('-a, --alpha', (o) => {
          expect(() => o.validator).toThrow()
        })
      })
    })
  })
})

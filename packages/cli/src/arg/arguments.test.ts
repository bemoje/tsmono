// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Argument } from 'commander'
import { ArgumentBuilder } from './ArgumentBuilder'
import { ArgumentParserSelector } from './ArgumentParserSelector'
import { ArgumentValidatorSelector } from './ArgumentValidatorSelector'
import { CLI } from '../cmd/CLI'
import { CommandBuilder } from '../cmd/CommandBuilder'

describe('argument', () => {
  CommandBuilder.testMode()
  describe('name', () => {
    const run = CLI('t', (c) => {
      c.argument('[arg]', 'abc')
      const arg = c.arguments[0]
      expect(arg.name()).toBe('arg')
    })
    run()
  })

  describe('description', () => {
    it('set inside callback', () => {
      const run = CLI('t', (c) => {
        c.argument('[arg]', (a) => {
          a.description('abc')
          expect(a.get.description).toBe('abc')
        })
        const arg = c.arguments[0]
        expect(arg.description).toBe('abc')
      })
      run()
    })

    it('set as second argument', () => {
      const run = CLI('t', (c) => {
        c.argument('[arg]', 'abc')
        const arg = c.arguments[0]
        expect(arg.description).toBe('abc')
      })
      run()
    })

    it('allow no description', () => {
      const run = CLI('t', (c) => c.argument('[arg]'))
      expect(() => run()).not.toThrow()
    })
  })

  describe('optional', () => {
    it('should have optional property true and required false', () => {
      const run = CLI('t', (c) => {
        c.argument('[arg]', (a) => {
          expect(a.get.optional).toBe(true)
          expect(a.get.required).toBe(false)
          expect(a.$.required).toBe(false)
        })
        const arg = c.arguments[0]
        expect(arg).toBeInstanceOf(Argument)
      })
      run()
    })

    it('should not throw if arg missing', () => {
      const run = CLI('t', (c) => {
        c.action((arg) => {})
        c.argument('[arg]')
      })
      expect(() => run().parse([], { from: 'user' })).not.toThrow()
    })

    it('variadic', () => {
      const run = CLI('t', (c) => {
        c.argument('[arg1]', (a) => {
          expect(a.get.variadic).toBe(false)
        })
        c.argument('[arg2...]', (a) => {
          expect(a.get.optional).toBe(true)
          expect(a.get.variadic).toBe(true)
        })
      })
      run()
    })
  })

  describe('required', () => {
    it('should have optional property false and required true', () => {
      const run = CLI('t', (c) => {
        c.argument('<arg>', (a) => {
          expect(a.get.optional).toBe(false)
          expect(a.get.required).toBe(true)
          expect(a.$.required).toBe(true)
        })
        const arg = c.arguments[0]
        expect(arg).toBeInstanceOf(Argument)
      })
      run()
    })

    it('should throw only if arg missing', () => {
      const run = CLI('t', (c) => {
        c.action((a) => {})
        c.argument('<arg>')
      })
      expect(() => run().parse([], { from: 'user' })).toThrow()
      expect(() => run().parse(['a'], { from: 'user' })).not.toThrow()
    })

    it('variadic', () => {
      const run1 = CLI('t', (c) => {
        c.argument('<arg1>', (a) => {
          expect(a.get.variadic).toBe(false)
        })
        c.argument('<arg2...>', (a) => {
          expect(a.get.variadic).toBe(true)
        })
      })
      run1()

      const run2 = CLI('t', (c) => {
        c.argument('<arg>')
        c.argument('<args...>')
        c.action((arg, args) => {
          expect(arg).toBe('a')
          expect(args).toEqual(['b', 'c'])
        })
      })
      expect(() => run2().parse(['a', 'b', 'c'], { from: 'user' })).not.toThrow()
    })
  })

  describe('default', () => {
    it('should throw if required', () => {
      const run = CLI('t', (c) => {
        c.argument('<arg1>', (a) => {
          a.default('v')
        })
      })
      expect(() => run()).toThrow()
    })

    it('should not throw if optional', () => {
      const run = CLI('t', (c) => {
        c.argument('[arg]', (a) => {
          a.default('v')
          expect(a.get.default).toBe('v')
        })
      })
      expect(() => run()).not.toThrow()
    })
  })

  describe('choices', () => {
    it('should set and get choices', () => {
      const run = CLI('t', (c) => {
        c.argument('<arg1>', (a) => {
          a.choices(['a', 'b'])
          expect(a.get.choices).toEqual(['a', 'b'])
        })
      })
      run()
    })
  })

  describe('parser', () => {
    it('should return a ArgumentParserSelector instance', () => {
      const arg = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
      expect(arg.parser).toBeInstanceOf(ArgumentParserSelector)
    })

    it('should parse string, number, integer', () => {
      const run = CLI('t', (c) => {
        c.argument('<str>', (a) => a.parser.string())
        c.argument('<num>', (a) => a.parser.number())
        c.argument('<int>', (a) => a.parser.integer())
        c.action((str, num, int) => {
          expect(str).toBe('str')
          expect(num).toBe(3.2)
          expect(int).toBe(3)
        })
      })
      run().parse(['str', '3.2', '3'], { from: 'user' })
    })
    it('should parse delimited string, number, integer', () => {
      const run = CLI('t', (c) => {
        c.argument('<strs>', (a) => a.parser.delimitedStrings())
        c.argument('<nums>', (a) => a.parser.delimitedNumbers())
        c.argument('<ints>', (a) => a.parser.delimitedIntegers())
        c.action((strs, nums, ints) => {
          expect(strs).toEqual(['a', 'b'])
          expect(nums).toEqual([3.1, 4.1])
          expect(ints).toEqual([3, 4, 5])
        })
      })
      run().parse(['a,b', '3.1,4.1', '3,4,5'], { from: 'user' })
    })
    it('should parse with custom parser', () => {
      const run = CLI('t', (c) => {
        c.argument('<arg>', (a) => a.parser.custom((s) => s.split('')))
        c.action((arg) => {
          expect(arg).toEqual(['a', 'b', 'c'])
        })
      })
      run().parse(['abc'], { from: 'user' })
    })
  })

  describe('validator', () => {
    it('should return a ArgumentValidatorSelector instance', () => {
      const arg = new ArgumentBuilder(new CommandBuilder('t'), '[arg]')
      expect(arg.validator).toBeInstanceOf(ArgumentValidatorSelector)
    })
    it('should validate string, number, integer', () => {
      const run = CLI('t', (c) => {
        c.argument('<str>', (a) => a.parser.string().validator.isString())
        c.argument('<num>', (a) => a.parser.number().validator.isNumber())
        c.argument('<int>', (a) => a.parser.integer().validator.isInteger())
        c.action((str, num, int) => {
          expect(str).toBe('str')
          expect(num).toBe(3.2)
          expect(int).toBe(3)
        })
      })
      run().parse(['str', '3.2', '3'], { from: 'user' })
    })
    it('should throw if invalid', () => {
      const run = CLI('t', (c) => {
        c.throwInsteadOfProcessExit()
        c.argument('<int>', (a) => a.parser.integer().validator.isInteger())
        c.action(async (int) => int)
      })
      expect(() => run().parseAsync(['3.2'], { from: 'user' })).rejects.toThrow()
    })
    it('should validate delimited string, number, integer', () => {
      const run = CLI('t', (c) => {
        c.argument('<strs>', (a) => a.parser.delimitedStrings().validator.isStringArray())
        c.argument('<nums>', (a) => a.parser.delimitedNumbers().validator.isNumberArray())
        c.argument('<ints>', (a) => a.parser.delimitedIntegers().validator.isIntegerArray())
        c.action((strs, nums, ints) => {
          expect(strs).toEqual(['a', 'b'])
          expect(nums).toEqual([3.1, 4.1])
          expect(ints).toEqual([3, 4, 5])
        })
      })
      run().parse(['a,b', '3.1,4.1', '3,4,5'], { from: 'user' })
    })
    it('should throw if invalid', () => {
      const run = CLI('t', (c) => {
        c.argument('<ints>', (a) => a.parser.delimitedIntegers().validator.isIntegerArray())
        c.action(async (ints) => ints)
      })
      expect(() => run().parseAsync(['3,q,7'], { from: 'user' })).rejects.toThrow()
    })
    it('should validate with custom validator', () => {
      const run = CLI('t', (c) => {
        c.argument('<arg>', (a) => a.validator.custom((arg) => arg === 'abc'))
        c.action((arg) => arg)
      })
      expect(() => run().parse(['ab'], { from: 'user' })).toThrow()
    })
    it('should validate with multiple validators', () => {
      const run = CLI('t', (c) => {
        c.argument('<arg>', (a) => {
          a.validator.custom((arg: string) => arg !== 'abc')
          a.validator.custom((arg: string) => arg.length >= 3)
        })
        c.action(async (arg) => arg)
      })
      expect(() => run().parseAsync(['ab'], { from: 'user' })).rejects.toThrow()
      expect(() => run().parseAsync(['abc'], { from: 'user' })).rejects.toThrow()
      expect(() => run().parseAsync(['abcd'], { from: 'user' })).not.toThrow()
    })
  })
})

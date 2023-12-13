/* eslint-disable @typescript-eslint/no-non-null-assertion */
import colors from 'ansi-colors'
import { CLI } from './CLI'
import { CommandBuilder } from './CommandBuilder'
import { OutputManager } from '../core/OutputManager'

describe(CommandBuilder.name, () => {
  jest.spyOn(process, 'exit').mockImplementation((code?: number) => {
    throw new Error('process.exit(' + code ?? '' + ') was called')
  })

  describe('version', () => {
    it('should set verison', () => {
      new CommandBuilder('t', (c) => {
        const spy = jest.spyOn(c.$, 'version')
        c.version('0.0.0')
        expect(spy).toHaveBeenCalledWith('0.0.0')
      })
    })

    it('should throw if already initialized', () => {
      expect(() => new CommandBuilder('t').version('0.0.0')).toThrow()
    })
  })

  describe('description', () => {
    it('should set description', () => {
      new CommandBuilder('t', (c) => {
        const spy = jest.spyOn(c.$, 'description')
        c.description('abc')
        expect(spy).toHaveBeenCalledWith('abc')
      })
    })

    it('should extract a summary - sentence', () => {
      new CommandBuilder('t', (c) => {
        c.description('This is one. This is two.')
        expect(c.$.description()).toBe('This is one. This is two.')
        expect(c.$.summary()).toBe('This is one.')
      })
    })

    it('should extract a summary - lines', () => {
      new CommandBuilder('t', (c) => {
        c.description('This is one.\nThis is two.')
        expect(c.$.description()).toBe('This is one.\nThis is two.')
        expect(c.$.summary()).toBe('This is one.')
      })
    })

    it('should extract a summary - multiple strings', () => {
      new CommandBuilder('t', (c) => {
        c.description('This is one.', 'This is two.')
        expect(c.$.description()).toBe('This is one.\nThis is two.')
        expect(c.$.summary()).toBe('This is one.')
      })
    })
  })

  describe('name', () => {
    it('should set name', () => {
      new CommandBuilder('t', (c) => {
        expect(c.$.name()).toBe('t')
      })
    })

    it('should throw if trying to use reserved name', () => {
      new CommandBuilder('t', (c) => {
        expect(() => c.command('u', () => {})).toThrow()
        expect(() => c.command('util', () => {})).toThrow()
      })
    })

    it('should not throw if trying to use reserved name if native command', () => {
      new CommandBuilder('t', (c) => {
        expect(() => c.nativeCommand('u', () => {})).not.toThrow()
        expect(() => c.nativeCommand('util', () => {})).not.toThrow()
      })
    })
  })

  describe('alias', () => {
    it('should set alias', () => {
      new CommandBuilder('test', (c) => {
        const spy = jest.spyOn(c.$, 'alias')
        c.alias('t')
        expect(spy).toHaveBeenCalledWith('t')
      })
    })

    it('should throw if trying to use reserved name', () => {
      new CommandBuilder('t', (c) => {
        expect(() => c.alias('u')).toThrow()
        expect(() => c.alias('util')).toThrow()
      })
    })

    it('should not throw if trying to use reserved name if native command', () => {
      new CommandBuilder('t', (c) => {
        expect(() => {
          c.nativeCommand('sub', (c) => {
            c.alias('u')
            c.alias('util')
          })
        }).not.toThrow()
      })
    })
  })

  describe('aliases', () => {
    it('should set aliases', () => {
      new CommandBuilder('test', (c) => {
        const spy = jest.spyOn(c.$, 'aliases')
        c.aliases('t', 'tt')
        expect(spy).toHaveBeenCalledWith(['t', 'tt'])
      })
    })

    it('should throw if trying to use reserved name', () => {
      new CommandBuilder('t', (c) => {
        expect(() => c.aliases('t', 'u')).toThrow()
        expect(() => c.aliases('tt', 'util')).toThrow()
      })
    })

    it('should not throw if trying to use reserved name if native command', () => {
      new CommandBuilder('t', (c) => {
        expect(() => {
          c.nativeCommand('sub', (c) => {
            c.aliases('u', 'util')
          })
        }).not.toThrow()
      })
    })
  })

  describe('get root', () => {
    it('should return self if no parent', () => {
      new CommandBuilder('t', (c) => {
        expect(c.root).toBe(c)
      })
    })

    it('should return the root', () => {
      new CommandBuilder('t', (c) => {
        c.command('sub1', (sub1) => {
          expect(sub1.root).toBe(c)
          sub1.command('sub2', (sub2) => {
            expect(sub2.root).toBe(c)
          })
        })
      })
    })
  })

  it('get isRoot', () => {
    new CommandBuilder('t', (c) => {
      expect(c.isRoot).toBe(true)
      c.command('sub', (sub) => {
        expect(sub.isRoot).toBe(false)
      })
    })
  })

  it('get arguments', () => {
    new CommandBuilder('t', (c) => {
      expect(c.arguments).toBe(c.$.registeredArguments)
    })
  })

  it('get options', () => {
    new CommandBuilder('t', (c) => {
      expect(c.options).toBe(c.$.options)
    })
  })

  it('get commander', () => {
    new CommandBuilder('t', (c) => {
      expect(c.commander).toBe(c.$)
    })
  })

  describe('get hasGrandChildren', () => {
    it('should return false if has no grandchildren', () => {
      new CommandBuilder('t', (c) => {
        expect(c.hasGrandChildren).toBe(false)
      })
    })

    it('should return false if has only children', () => {
      new CommandBuilder('t', (c) => {
        c.command('child', () => {})
        expect(c.hasGrandChildren).toBe(false)
      })
    })

    it('should return true if has grandchildren', () => {
      new CommandBuilder('t', (c) => {
        c.command('child', (s) => {
          s.command('grand', () => {})
        })
        expect(c.hasGrandChildren).toBe(true)
      })
    })
  })

  describe('get isLastArgVariadic', () => {
    it('should return false if has no variadic', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg1]')
        expect(c.isLastArgVariadic).toBe(false)
      })
    })

    it('should throw if a variadic arg is not last', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg1...]')
        expect(() => c.argument('[arg2]')).toThrow()
      })
    })

    it('should return true if last arg is variadic', () => {
      new CommandBuilder('t', (c) => {
        c.argument('[arg1]')
        c.argument('[arg2...]')
        expect(c.isLastArgVariadic).toBe(true)
      })
    })
  })

  it('getExecutableDir', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'executableDir')
      c.getExecutableDir()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getOptionValue', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'getOptionValue')
      c.getOptionValue('help')
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getOptionValueSource', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'getOptionValueSource')
      c.getOptionValueSource('help')
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getOptionValueSourceWithGlobals', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'getOptionValueSourceWithGlobals')
      c.getOptionValueSourceWithGlobals('help')
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getActionHandler', () => {
    new CommandBuilder('t', (c) => {
      const f = () => {}
      c.action(f)
      expect(c.getActionHandler()).toBe(f)
    })
  })

  it('getDescription', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'description')
      c.getDescription()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getSummary', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'summary')
      c.getSummary()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getVersion', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'version')
      c.getVersion()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getAlias', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'alias')
      c.getAlias()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  it('getAliases', () => {
    new CommandBuilder('t', (c) => {
      const spy = jest.spyOn(c.$, 'aliases')
      c.getAliases()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getPrefixArray', () => {
    it('should return own name if root', () => {
      new CommandBuilder('t', (c) => {
        expect(c.getPrefixArray()).toEqual(['t'])
      })
    })

    it('should return command name path back to root', () => {
      new CommandBuilder('t', (c) => {
        c.command('sub1', (sub1) => {
          expect(sub1.getPrefixArray()).toEqual(['t', 'sub1'])
          sub1.command('sub2', (sub2) => {
            expect(sub2.getPrefixArray()).toEqual(['t', 'sub1', 'sub2'])
          })
        })
      })
    })
  })

  describe('getPrefixString', () => {
    it('should join prefixArray with spaces', () => {
      new CommandBuilder('t', (c) => {
        c.command('sub1', (sub1) => {
          sub1.command('sub2', (sub2) => {
            expect(sub2.getPrefixString()).toBe('t sub1 sub2')
          })
        })
      })
    })
  })

  describe('enableBuiltinOptions', () => {
    describe('debug', () => {
      it('should add as global option', () => {
        new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ debug: true })
          const debug = c.options.find((o) => o.attributeName() === 'debug')
          expect(debug!.attributeName()).toBe('debug')
          expect(c.meta.globalOptions.includes(debug!)).toBe(true)
        })
      })

      it('should not be a recognized option when executing program if not enabled', () => {
        const c = new CommandBuilder('t', (c) => {
          c.action(() => {})
        })
        console.debug = jest.fn().mockImplementation(() => {})
        OutputManager.getInstance().stderr.disable()
        expect(() => c.$.parse(['--debug'], { from: 'user' })).toThrow()
      })

      it('should be a recognized option when executing program', () => {
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ debug: true })
          c.action((opts) => {
            expect(opts.debug).toBe(true)
          })
        })
        console.debug = jest.fn().mockImplementation(() => {})
        OutputManager.getInstance().debug.disable()
        c.$.parse(['--debug'], { from: 'user' })
      })

      it('should enable debug', () => {
        const spy = jest.spyOn(OutputManager.getInstance().debug, 'enable').mockImplementation(() => {})
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ debug: true })
          c.action(() => {})
        })
        c.$.parse([], { from: 'user' })
        expect(spy).not.toHaveBeenCalled()
        c.$.parse(['--debug'], { from: 'user' })
        expect(spy).toHaveBeenCalled()
      })
    })

    describe('disableColor', () => {
      it('should add as global option', () => {
        new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableColor: true })
          const disableColor = c.options.find((o) => o.attributeName() === 'disableColor')
          expect(disableColor!.attributeName()).toBe('disableColor')
          expect(c.meta.globalOptions.includes(disableColor!)).toBe(true)
        })
      })

      it('should not be a recognized option when executing program if not enabled', () => {
        const c = new CommandBuilder('t', (c) => {
          c.action(() => {})
        })
        OutputManager.getInstance().stderr.disable()
        expect(() => c.$.parse(['--disable-color'], { from: 'user' })).toThrow()
      })

      it('should be a recognized option when executing program', () => {
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableColor: true })
          c.action((opts) => {
            expect(opts.disableColor).toBe(true)
          })
        })
        c.$.parse(['--disable-color'], { from: 'user' })
      })

      it('should disable color', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => {})
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableColor: true })
          c.action(() => {
            console.log(colors.cyan('abc'))
          })
        })
        c.$.parse([], { from: 'user' })
        expect(spy).not.toHaveBeenCalledWith('abc') // is ansi colors
        c.$.parse(['--disable-color'], { from: 'user' })
        expect(spy).toHaveBeenCalledWith('abc') // now wihout ansi colors
      })
    })

    describe('disableStderr', () => {
      it('should add as global option', () => {
        new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableStderr: true })
          const disableStderr = c.options.find((o) => o.attributeName() === 'disableStderr')
          expect(disableStderr!.attributeName()).toBe('disableStderr')
          expect(c.meta.globalOptions.includes(disableStderr!)).toBe(true)
        })
      })

      it('should not be a recognized option when executing program if not enabled', () => {
        const c = new CommandBuilder('t', (c) => {
          c.action(() => {})
        })
        OutputManager.getInstance().stderr.disable()
        expect(() => c.$.parse(['--disable-stderr'], { from: 'user' })).toThrow()
      })

      it('should be a recognized option when executing program', () => {
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableStderr: true })
          c.action((opts) => {
            expect(opts.disableStderr).toBe(true)
          })
        })
        c.$.parse(['--disable-stderr'], { from: 'user' })
      })

      it('should disable stderr', () => {
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableStderr: true })
          c.action(() => {})
        })
        const spy = jest.spyOn(OutputManager.getInstance().stderr, 'disable')
        c.$.parse([], { from: 'user' })
        expect(spy).not.toHaveBeenCalled()
        c.$.parse(['--disable-stderr'], { from: 'user' })
        expect(spy).toHaveBeenCalled()
      })
    })

    describe('disableStdout', () => {
      it('should add as global option', () => {
        new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableStdout: true })
          const disableStdout = c.options.find((o) => o.attributeName() === 'disableStdout')
          expect(disableStdout!.attributeName()).toBe('disableStdout')
          expect(c.meta.globalOptions.includes(disableStdout!)).toBe(true)
        })
      })

      it('should not be a recognized option when executing program if not enabled', () => {
        const c = new CommandBuilder('t', (c) => {
          c.action(() => {})
        })
        OutputManager.getInstance().stderr.disable()
        expect(() => c.$.parse(['--disable-stdout'], { from: 'user' })).toThrow()
      })

      it('should be a recognized option when executing program', () => {
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableStdout: true })
          c.action((opts) => {
            expect(opts.disableStdout).toBe(true)
          })
        })
        c.$.parse(['--disable-stdout'], { from: 'user' })
      })

      it('should disable stdout', () => {
        const c = new CommandBuilder('t', (c) => {
          c.enableBuiltinOptions({ disableStdout: true })
          c.action(() => {})
        })
        const spy = jest.spyOn(OutputManager.getInstance().stdout, 'disable')
        c.$.parse([], { from: 'user' })
        expect(spy).not.toHaveBeenCalled()
        c.$.parse(['--disable-stdout'], { from: 'user' })
        expect(spy).toHaveBeenCalled()
      })
    })
  })

  describe('getPrefixArray', () => {
    it('single command', () => {
      new CommandBuilder('cmd', (c) => {
        expect(c.getPrefixArray()).toEqual(['cmd'])
      })
    })

    it('nested commands', () => {
      new CommandBuilder('t', (test: CommandBuilder) => {
        test.command('sub1', (sub1) => {
          sub1.command('sub2', (sub2) => {
            expect(sub2.getPrefixArray()).toEqual(['t', 'sub1', 'sub2'])
          })
        })
      })
    })
  })

  describe('preset', () => {
    it('should add preset', () => {
      new CommandBuilder('t', (c) => {
        c.preset('abc', { description: 'abc' })
        expect(c.db.presets.defaultValues['abc']).toEqual({
          description: 'abc',
          presets: [],
          args: [],
          options: {},
        })
      })
    })

    it('adding preset should enable presets feature', () => {
      new CommandBuilder('t', function (this: CommandBuilder) {
        expect(this.features.isPresetsEnabled).toBe(false)
        this.preset('abc', { description: 'abc' })
        expect(this.features.isPresetsEnabled).toBe(true)
      })
    })

    it('adding preset should add preset ', () => {
      new CommandBuilder('t', function (this: CommandBuilder) {
        expect(this.features.isPresetsEnabled).toBe(false)
        this.preset('abc', { description: 'abc' })
        expect(this.features.isPresetsEnabled).toBe(true)
      })
    })

    it('should throw if preset already exists', () => {
      new CommandBuilder('t', (c) => {
        c.preset('abc', { description: 'abc' })
        expect(() => c.preset('abc', { description: 'a' })).toThrow()
      })
    })

    describe('arguments', () => {
      it('should throw if trying to preset required argument', () => {
        new CommandBuilder('t', (c) => {
          c.argument('<arg>')
          expect(() => c.preset('a', { description: '', args: ['value'] })).toThrow()
        })
      })

      let result = ''
      const init = CLI('t', (c) => {
        c.argument('[name]')
        c.action((name: string) => {
          result = name
        })
        c.preset('john', {
          description: '',
          args: ['john'],
        })
        c.preset('anna', {
          description: '',
          args: ['anna'],
        })
      })

      it('should parse presets on action', () => {
        init().parse(['--john'], { from: 'user' })
        expect(result).toBe('john')
        init().parse(['--anna'], { from: 'user' })
        expect(result).toBe('anna')
      })

      it('should let stacked presets override each other', () => {
        init().parse('--anna --john'.split(' '), { from: 'user' })
        expect(result).toBe('john')
        init().parse('--john --anna'.split(' '), { from: 'user' })
        expect(result).toBe('anna')
      })

      it('should always have arguments override preset values', () => {
        init().parse('mia --john --anna'.split(' '), { from: 'user' })
        expect(result).toBe('mia')
      })
    })
  })
})

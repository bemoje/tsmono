/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { colors } from '@bemoje/util'
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
      new CommandBuilder('test', (c) => {
        expect(c.$.name()).toBe('test')
      })
    })

    it('should throw if trying to use reserved name', () => {
      new CommandBuilder('test', (c) => {
        expect(() => c.command('u', () => {})).toThrow()
        expect(() => c.command('util', () => {})).toThrow()
      })
    })

    it('should not throw if trying to use reserved name if native command', () => {
      new CommandBuilder('test', (c) => {
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
      new CommandBuilder('test', (c) => {
        expect(() => c.alias('u')).toThrow()
        expect(() => c.alias('util')).toThrow()
      })
    })

    it('should not throw if trying to use reserved name if native command', () => {
      new CommandBuilder('test', (c) => {
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
      new CommandBuilder('test', (c) => {
        expect(() => c.aliases('t', 'u')).toThrow()
        expect(() => c.aliases('tt', 'util')).toThrow()
      })
    })

    it('should not throw if trying to use reserved name if native command', () => {
      new CommandBuilder('test', (c) => {
        expect(() => {
          c.nativeCommand('sub', (c) => {
            c.aliases('u', 'util')
          })
        }).not.toThrow()
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
        const c = new CommandBuilder('t', (c) => {
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
      new CommandBuilder('test', (test: CommandBuilder) => {
        test.command('sub1', (sub1) => {
          sub1.command('sub2', (sub2) => {
            expect(sub2.getPrefixArray()).toEqual(['test', 'sub1', 'sub2'])
          })
        })
      })
    })
  })
})

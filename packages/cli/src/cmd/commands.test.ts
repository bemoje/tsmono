/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CLI } from './CLI'
import { colors } from '@bemoje/util'
import { Command } from 'commander'
import { CommandBuilder } from './CommandBuilder'
import { OutputManager } from '../core/OutputManager'

describe('commands', () => {
  CommandBuilder.testMode()

  describe('version', () => {
    it('should set verison', () => {
      const cmd = new CommandBuilder('t')
      const spy = jest.spyOn(cmd.$, 'version')
      cmd.version('0.0.0')
      expect(spy).toHaveBeenCalledWith('0.0.0')
    })
  })
  describe('description', () => {
    it('should set description', () => {
      const cmd = new CommandBuilder('t')
      const spy = jest.spyOn(cmd.$, 'description')
      cmd.description('abc')
      expect(spy).toHaveBeenCalledWith('abc')
    })
    it('should extract a summary - sentence', () => {
      const cmd = new CommandBuilder('t')
      cmd.description('This is one. This is two.')
      expect(cmd.$.description()).toBe('This is one. This is two.')
      expect(cmd.$.summary()).toBe('This is one.')
    })
    it('should extract a summary - lines', () => {
      const cmd = new CommandBuilder('t')
      cmd.description('This is one.\nThis is two.')
      expect(cmd.$.description()).toBe('This is one.\nThis is two.')
      expect(cmd.$.summary()).toBe('This is one.')
    })
    it('should extract a summary - multiple strings', () => {
      const cmd = new CommandBuilder('t')
      cmd.description('This is one.', 'This is two.')
      expect(cmd.$.description()).toBe('This is one.\nThis is two.')
      expect(cmd.$.summary()).toBe('This is one.')
    })
  })
  describe('name', () => {
    it('should set name', () => {
      const cmd = new CommandBuilder('test')
      expect(cmd.$.name()).toBe('test')
    })
    it('should throw if trying to use reserved name', () => {
      const cmd = new CommandBuilder('test')
      expect(() => cmd.command('u', () => {})).toThrow()
      expect(() => cmd.command('util', () => {})).toThrow()
    })
    it('should not throw if trying to use reserved name if native command', () => {
      const cmd = new CommandBuilder('test')
      expect(() => cmd.nativeCommand('u', () => {})).not.toThrow()
      expect(() => cmd.nativeCommand('util', () => {})).not.toThrow()
    })
  })
  describe('alias', () => {
    it('should set alias', () => {
      const cmd = new CommandBuilder('test')
      const spy = jest.spyOn(cmd.$, 'alias')
      cmd.alias('t')
      expect(spy).toHaveBeenCalledWith('t')
    })
    it('should throw if trying to use reserved name', () => {
      const cmd = new CommandBuilder('test')
      expect(() => cmd.alias('u')).toThrow()
      expect(() => cmd.alias('util')).toThrow()
    })
    it('should not throw if trying to use reserved name if native command', () => {
      const cmd = new CommandBuilder('test')
      expect(() =>
        cmd.nativeCommand('sub', (c) => {
          c.alias('u')
          c.alias('util')
        })
      ).not.toThrow()
    })
  })
  describe('aliases', () => {
    it('should set aliases', () => {
      const cmd = new CommandBuilder('test')
      const spy = jest.spyOn(cmd.$, 'aliases')
      cmd.aliases('t', 'tt')
      expect(spy).toHaveBeenCalledWith(['t', 'tt'])
    })
    it('should throw if trying to use reserved name', () => {
      const cmd = new CommandBuilder('test')
      expect(() => cmd.aliases('t', 'u')).toThrow()
      expect(() => cmd.aliases('tt', 'util')).toThrow()
    })
    it('should not throw if trying to use reserved name if native command', () => {
      const cmd = new CommandBuilder('test')
      expect(() =>
        cmd.nativeCommand('sub', (c) => {
          c.aliases('u', 'util')
        })
      ).not.toThrow()
    })
  })
  describe('enableBuiltinOptions', () => {
    describe('debug', () => {
      it('should add as global option', () => {
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ debug: true })
        const debug = cmd.options.find((o) => o.attributeName() === 'debug')
        expect(debug!.attributeName()).toBe('debug')
        expect(cmd.meta.globalOptions.includes(debug!)).toBe(true)
      })
      it('should not be a recognized option when executing program if not enabled', () => {
        const cmd = new CommandBuilder('t')
        cmd.action(() => {})
        expect(() => cmd.$.parse(['--debug'], { from: 'user' })).toThrow()
      })
      it('should be a recognized option when executing program', () => {
        console.debug = jest.fn()
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ debug: true })
        cmd.action((opts) => {
          expect(opts.debug).toBe(true)
        })
        cmd.$.parse(['--debug'], { from: 'user' })
      })
    })
    describe('disableColor', () => {
      it('should add as global option', () => {
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ disableColor: true })
        const disableColor = cmd.options.find((o) => o.attributeName() === 'disableColor')
        expect(disableColor!.attributeName()).toBe('disableColor')
        expect(cmd.meta.globalOptions.includes(disableColor!)).toBe(true)
      })
      it('should not be a recognized option when executing program if not enabled', () => {
        const cmd = new CommandBuilder('t')
        cmd.action(() => {})
        expect(() => cmd.$.parse(['--disable-color'], { from: 'user' })).toThrow()
      })
      it('should be a recognized option when executing program', () => {
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ disableColor: true })
        cmd.action((opts) => {
          expect(opts.disableColor).toBe(true)
        })
        cmd.$.parse(['--disable-color'], { from: 'user' })
      })
      it('should disable color', () => {
        const cmd = new CommandBuilder('t')
        const spy = jest.spyOn(console, 'log')
        cmd.enableBuiltinOptions({ disableColor: true })
        cmd.action((opts) => {
          console.log(colors.cyan('abc'))
        })
        cmd.$.parse(['--disable-color'], { from: 'user' })
        expect(spy).toHaveBeenCalledWith('abc')
      })
    })
    describe('disableStderr', () => {
      it('should add as global option', () => {
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ disableStderr: true })
        const disableStderr = cmd.options.find((o) => o.attributeName() === 'disableStderr')
        expect(disableStderr!.attributeName()).toBe('disableStderr')
        expect(cmd.meta.globalOptions.includes(disableStderr!)).toBe(true)
      })
      it('should not be a recognized option when executing program if not enabled', () => {
        const cmd = new CommandBuilder('t')
        cmd.action(() => {})
        expect(() => cmd.$.parse(['--disable-stderr'], { from: 'user' })).toThrow()
      })
      it('should be a recognized option when executing program', () => {
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ disableStderr: true })
        cmd.action((opts) => {
          expect(opts.disableStderr).toBe(true)
        })
        cmd.$.parse(['--disable-stderr'], { from: 'user' })
      })
    })
    describe('disableStdout', () => {
      it('should add as global option', () => {
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ disableStdout: true })
        const disableStdout = cmd.options.find((o) => o.attributeName() === 'disableStdout')
        expect(disableStdout!.attributeName()).toBe('disableStdout')
        expect(cmd.meta.globalOptions.includes(disableStdout!)).toBe(true)
      })
      it('should not be a recognized option when executing program if not enabled', () => {
        const cmd = new CommandBuilder('t')
        cmd.action(() => {})
        expect(() => cmd.$.parse(['--disable-stdout'], { from: 'user' })).toThrow()
      })
      it('should be a recognized option when executing program', () => {
        const cmd = new CommandBuilder('t')
        cmd.enableBuiltinOptions({ disableStdout: true })
        cmd.action((opts) => {
          expect(opts.disableStdout).toBe(true)
        })
        cmd.$.parse(['--disable-stdout'], { from: 'user' })
      })
    })
  })
})

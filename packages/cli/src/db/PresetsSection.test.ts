import { CommandBuilder } from '../cmd/CommandBuilder'
import { JsonFile } from './JsonFile'
import { PresetsSection } from './PresetsSection'

describe(PresetsSection.name, () => {
  const emptyPreset = {
    description: 'empty',
    presets: [],
    args: [],
    options: {},
  }

  const defaults = {
    description: 'All presets inherit from this preset',
    presets: [],
    args: [null],
    options: {
      help: false,
      opt: false,
    },
  }

  let file: JsonFile
  let section: PresetsSection
  let saveSpy: jest.SpyInstance

  beforeEach(() => {
    new CommandBuilder('t', (c) => {
      c.argument('[arg]')
      c.option('--opt')
      c.preset('preset1', {
        description: 'preset1',
      })
      file = c.db
      section = file.presets
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      saveSpy = jest.spyOn(file.db, 'save').mockImplementation((() => {}) as any)
    })
  })

  describe('constructor', () => {
    it('should create an instance of PresetsSection', () => {
      expect(section).toBeInstanceOf(PresetsSection)
    })

    it('should set the file property', () => {
      expect(section.file).toBe(file)
    })

    it('should set defaults', () => {
      expect(section.defaultValues['defaults']).toEqual(defaults)
    })
  })

  describe('assertValid', () => {
    it('should validate', () => {
      expect(() => section.assertValid('key', emptyPreset)).not.toThrow()
      expect(() => section.assertValid('key key', emptyPreset)).toThrow()
    })
  })

  describe('defineProperty', () => {
    it('should define a property for the section', () => {
      section.defineProperty('key', emptyPreset)
      expect(section.defaultValues['key']).toEqual(emptyPreset)
    })

    it('should clone value', () => {
      section.defineProperty('key', emptyPreset)
      expect(section.defaultValues['key']).not.toBe(emptyPreset)
      expect(section.defaultValues['key']).toEqual(emptyPreset)
    })
  })

  describe('initialize', () => {
    it('should do nothing if the section is already initialized', () => {
      section.initialize()
      const spy = jest.spyOn(section.db, 'getSafe')
      section.initialize()
      expect(spy).not.toHaveBeenCalled()
    })

    it('should set the values if the section is not initialized', () => {
      section.defineProperty('key', emptyPreset)
      section.initialize()
      expect(section.get('key')).toEqual(emptyPreset)
    })

    it('should set the values and save the section if save is true', () => {
      section.defineProperty('key', emptyPreset)
      section.initialize(true)
      expect(saveSpy).toHaveBeenCalled()
    })

    it('should move preset names found in options to presets array', () => {
      section.defineProperty('key2', {
        description: 'd',
        presets: [],
        args: [],
        options: { preset1: true },
      })
      section.initialize()
      expect(section.get('key2')).toEqual({
        description: 'd',
        presets: ['preset1'],
        args: [],
        options: {},
      })
    })
  })

  describe('setAll', () => {
    it('should add defaults preset if missing', () => {
      const presets = { key: emptyPreset, preset1: section.get('preset1') }
      section.setAll(presets, false)
      expect(presets).toEqual({ key: emptyPreset, preset1: section.get('preset1'), defaults })
    })
  })

  describe('delete', () => {
    it('throws if trying to delete builtin presets', () => {
      expect(() => section.delete('preset1', false)).toThrow()
    })

    it('does not throw when deleting non-builtin presets', () => {
      section.set('other', emptyPreset)
      expect(() => section.delete('other', false)).not.toThrow()
    })
  })
})

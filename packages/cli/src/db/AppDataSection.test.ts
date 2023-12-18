import { AppDataSection } from './AppDataSection'
import { CommandBuilder } from '../cmd/CommandBuilder'
import { JsonFile } from './JsonFile'

describe(AppDataSection.name, () => {
  let file: JsonFile
  let section: AppDataSection

  beforeEach(() => {
    new CommandBuilder('t', (c) => {
      file = c.db
      section = file.appData
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(file.db, 'save').mockImplementation((() => {}) as any)
    })
  })

  describe('constructor', () => {
    it('should create an instance of AppDataSection', () => {
      expect(section).toBeInstanceOf(AppDataSection)
    })

    it('should set the file property', () => {
      expect(section.file).toBe(file)
    })
  })

  describe('assertValid', () => {
    it('should do nothing', () => {
      expect(section.assertValid()).toBeUndefined()
    })
  })

  describe('defineProperty', () => {
    it('should define a property for the section', () => {
      section.defineProperty('key', 'value')
      expect(section.defaultValues['key']).toBe('value')
    })

    it('should clone value', () => {
      const value = { a: 'value' }
      section.defineProperty('key', value)
      expect(section.defaultValues['key']).not.toBe(value)
      expect(section.defaultValues['key']).toEqual(value)
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
      section.defineProperty('key', 'value')
      section.initialize()
      expect(section.db.getSafe(section.prefix())).toEqual({ key: 'value' })
    })

    it('should set the values and save the section if save is true', () => {
      section.defineProperty('key', 'value')
      const spy = jest.spyOn(section.db, 'set')
      section.initialize(true)
      expect(spy).toBeCalledWith(section.prefix(), { key: 'value' }, true)
    })
  })
})

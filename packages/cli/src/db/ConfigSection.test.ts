import { CommandBuilder } from '../cmd/CommandBuilder'
import { ConfigSection } from './ConfigSection'
import { createTypedArrayValidator } from '../validators/createTypedArrayValidator'
import { createTypedListParser } from '../parsers/createTypedListParser'
import { isInteger } from '../validators/isInteger'
import { JsonFile } from './JsonFile'
import { parseInteger } from '../parsers/parseInteger'

describe(ConfigSection.name, () => {
  let file: JsonFile
  let section: ConfigSection
  const intConfigOptions = {
    description: 'info',
    defaultValue: 1,
    parse: parseInteger,
    validate: isInteger,
  }
  const intsConfigOptions = {
    description: 'info',
    defaultValue: [1],
    parse: createTypedListParser(',', parseInteger),
    validate: createTypedArrayValidator([isInteger]),
  }

  beforeEach(() => {
    new CommandBuilder('t', (c) => {
      file = c.db
      section = file.config
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(file.db, 'save').mockImplementation((() => {}) as any)
    })
  })

  describe('constructor', () => {
    it('should create an instance of ConfigSection', () => {
      expect(section).toBeInstanceOf(ConfigSection)
    })

    it('should set the file property', () => {
      expect(section.file).toBe(file)
    })
  })

  describe('assertValid', () => {
    it('should validate', () => {
      section.defineProperty('key', intConfigOptions)
      expect(() => section.assertValid('key', 1)).not.toThrow()
      expect(() => section.assertValid('key', 1.2)).toThrow()
    })
  })

  describe('defineProperty', () => {
    it('should define a property for the section', () => {
      section.defineProperty('key', intConfigOptions)
      expect(section.defaultValues['key']).toBe(1)
      expect(section.parsers['key']).toBe(parseInteger)
      expect(section.validators['key']).toBe(isInteger)
      expect(section.descriptions['key']).toBe('info')
    })

    it('should clone value', () => {
      section.defineProperty('key', intsConfigOptions)
      expect(section.defaultValues['key']).not.toBe(intsConfigOptions.defaultValue)
      expect(section.defaultValues['key']).toEqual(intsConfigOptions.defaultValue)
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
      section.defineProperty('key', intConfigOptions)
      section.initialize()
      expect(section.getAll()).toEqual({ key: 1 })
    })

    it('should set the values and save the section if save is true', () => {
      section.defineProperty('key', intConfigOptions)
      const spy = jest.spyOn(section.db, 'set')
      section.initialize(true)
      expect(spy).toBeCalledWith(section.prefix(), { key: 1 }, true)
    })
  })
})

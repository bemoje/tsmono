/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractJsonFileSection } from './AbstractJsonFileSection'
import { CommandBuilder } from '../cmd/CommandBuilder'
import { JsonFile } from './JsonFile'
import { JsonValue } from '../../../util/src'
import { promptUserEditJsonInTextEditorSync } from '@bemoje/util'

jest.mock('@bemoje/util', () => ({
  ...jest.requireActual('@bemoje/util'),
  promptUserEditJsonInTextEditorSync: jest.fn().mockImplementation(() => {}),
}))

describe(AbstractJsonFileSection.name, () => {
  let cmd: CommandBuilder
  let file: JsonFile
  let section: AbstractJsonFileSection
  let saveSpy: jest.SpyInstance
  class Section<Val = JsonValue> extends AbstractJsonFileSection<Val> {
    override assertValid(): void {
      return
    }
    override defineProperty(key: string, value: Val) {
      this.defaultValues[key] = value
    }
    override initialize() {
      return
    }
  }

  beforeEach(() => {
    cmd = new CommandBuilder('t')
    file = new JsonFile(cmd)
    section = new Section(file, 'section', false)
    saveSpy = jest.spyOn(file.db, 'save').mockImplementation((() => {}) as any)
  })

  describe('constructor', () => {
    it('should set the file property', () => {
      expect(section.file).toBe(file)
    })

    it('should set the prefixBaseString property', () => {
      expect(section.prefixBaseString).toBe('t')
    })
  })

  describe('get db', () => {
    it('should return the db property of the file', () => {
      expect(section.db).toBe(file.db)
    })
  })

  describe('get cmd', () => {
    it('should return the cmd property of the file', () => {
      expect(section.cmd).toBe(cmd)
    })
  })

  describe('save', () => {
    it('should call the save method of the db property', async () => {
      await section.save()
      expect(saveSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('prefix', () => {
    it('should return the prefixBaseString + "." + name if no key is provided', () => {
      expect(section.prefix()).toBe('t.section')
    })

    it('should return the prefixBaseString + "." + name + "." + key if a key is provided', () => {
      expect(section.prefix('key')).toBe('t.section.key')
    })
  })

  describe('get', () => {
    it('should call the initialize method with false', () => {
      const initializeSpy = jest.spyOn(section, 'initialize')
      section.get('key')
      expect(initializeSpy).toHaveBeenCalledWith(false)
    })

    it('should return the value associated with the key if it exists in the db', () => {
      jest.spyOn(section.db, 'getSafe').mockReturnValue('value')
      expect(section.get('key')).toBe('value')
    })

    it('should return the value associated with the key from defaultValues if it does not exist in the db', () => {
      section.defineProperty('key', 'value')
      expect(section.get('key')).toBe('value')
    })
  })

  describe('getAll', () => {
    it('should call the initialize method with false', () => {
      const initializeSpy = jest.spyOn(section, 'initialize')
      section.getAll()
      expect(initializeSpy).toHaveBeenCalledWith(false)
    })

    it('should return all the values in the section if they exist in the db', () => {
      const values = { key1: 'value1', key2: 'value2' }
      jest.spyOn(section.db, 'getSafe').mockReturnValue(values)
      expect(section.getAll()).toBe(values)
    })

    it('should return all the values in the section from defaultValues if they do not exist in the db', () => {
      const values = { key1: 'value1', key2: 'value2' }
      section.defineProperty('key1', 'value1')
      section.defineProperty('key2', 'value2')
      jest.spyOn(section.db, 'getSafe').mockReturnValue(undefined)
      expect(section.getAll()).toEqual(values)
    })
  })

  describe('get keys', () => {
    it('should return all the keys in the db', () => {
      jest.spyOn(section.db, 'getSafe').mockReturnValue({ key1: 'value1', key2: 'value2' })
      expect(section.keys).toEqual(['key1', 'key2'])
    })
  })

  describe('count', () => {
    it('should return the number of keys in the section', () => {
      jest.spyOn(section, 'keys', 'get').mockReturnValue(['key1', 'key2'])
      expect(section.count()).toBe(2)
    })
  })

  describe('set', () => {
    it('should call the initialize method', () => {
      const initializeSpy = jest.spyOn(section, 'initialize')
      section.set('key', 'value')
      expect(initializeSpy).toHaveBeenCalled()
    })

    it('should call the assertValid method with the key and value', () => {
      const assertValidSpy = jest.spyOn(section, 'assertValid')
      section.set('key', 'value')
      expect(assertValidSpy).toHaveBeenCalledWith('key', 'value')
    })

    it('should call the set method of the db property with the prefix, value, and save', () => {
      const setSpy = jest.spyOn(section.db, 'set')
      section.set('key', 'value', false)
      expect(setSpy).toHaveBeenCalledWith(section.prefix('key'), 'value', false)
    })
  })

  describe('setAll', () => {
    it('should call the getAll method', () => {
      const getAllSpy = jest.spyOn(section, 'getAll')
      section.setAll({})
      expect(getAllSpy).toHaveBeenCalled()
    })

    it('should call the set method for each key-value pair in the values object that is different from the original value', () => {
      section.defineProperty('key1', 'value1')
      section.defineProperty('key2', 'value2')
      const values = { key1: 'new value1', key2: 'value2' }
      const setSpy = jest.spyOn(section, 'set')
      section.setAll(values)
      expect(setSpy).toHaveBeenCalledWith('key1', 'new value1', false)
      expect(setSpy).toHaveBeenCalledTimes(1)
    })

    it('should call the delete method for each key in the original object that is not in the values object', () => {
      section.defineProperty('key1', 'value1')
      section.defineProperty('key2', 'value2')
      const values = { key1: 'value1' }
      const deleteSpy = jest.spyOn(section, 'delete')
      section.setAll(values)
      expect(deleteSpy).toHaveBeenCalledWith('key2', false)
      expect(deleteSpy).toHaveBeenCalledTimes(1)
    })

    it('should call the save method if save is true', () => {
      const saveSpy = jest.spyOn(section, 'save')
      section.setAll({}, true)
      expect(saveSpy).toHaveBeenCalled()
    })

    it('should not call the save method if save is false', () => {
      const saveSpy = jest.spyOn(section, 'save')
      section.setAll({}, false)
      expect(saveSpy).not.toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('should call the update method of the db property with the prefix, value, and save', () => {
      section.defineProperty('key', 'value')
      const setSpy = jest.spyOn(section, 'set')
      section.update('key', () => 'value', false)
      expect(setSpy).toHaveBeenCalledWith('key', 'value', false)
      section.update('key', () => 'value', true)
      expect(setSpy).toHaveBeenCalledWith('key', 'value', true)
    })
  })

  describe('reset', () => {
    it('should call the set method with the key and the default value for the key', () => {
      section.defineProperty('key', 'def')
      const setSpy = jest.spyOn(section, 'set')
      section.reset('key')
      expect(setSpy).toHaveBeenCalledWith('key', 'def', true)
    })
  })

  describe('resetAll', () => {
    it('should call the setAll method with the defaultValues object', () => {
      section.defineProperty('key1', 'def1')
      section.defineProperty('key2', 'def2')
      const setAllSpy = jest.spyOn(section, 'setAll')
      section.resetAll()
      expect(setAllSpy).toHaveBeenCalledWith({ key1: 'def1', key2: 'def2' }, true)
    })
  })

  describe('delete', () => {
    it('should call the initialize method', () => {
      const initializeSpy = jest.spyOn(section, 'initialize')
      section.delete('key')
      expect(initializeSpy).toHaveBeenCalled()
    })

    it('should call the delete method of the db property with the prefix and save', () => {
      const deleteSpy = jest.spyOn(section.db, 'delete')
      section.delete('key', false)
      expect(deleteSpy).toHaveBeenCalledWith(section.prefix('key'), false)
    })
  })

  describe('deleteAll', () => {
    it('should call the delete method for each key in the section', () => {
      const keys = ['key1', 'key2']
      jest.spyOn(section, 'keys', 'get').mockReturnValue(keys)
      const deleteSpy = jest.spyOn(section, 'delete').mockImplementation((() => {}) as any)
      section.deleteAll()
      expect(deleteSpy).toHaveBeenCalledWith('key1', false)
      expect(deleteSpy).toHaveBeenCalledWith('key2', false)
      expect(deleteSpy).toHaveBeenCalledTimes(2)
    })

    it('should call the save method if save is true', () => {
      const saveSpy = jest.spyOn(section, 'save')
      section.deleteAll(true)
      expect(saveSpy).toHaveBeenCalled()
    })

    it('should not call the save method if save is false', () => {
      const saveSpy = jest.spyOn(section, 'save')
      section.deleteAll(false)
      expect(saveSpy).not.toHaveBeenCalled()
    })
  })

  describe('edit', () => {
    it('should call the getAll method', () => {
      jest.spyOn(section, 'setAll').mockImplementation(() => {})
      const getAllSpy = jest.spyOn(section, 'getAll').mockReturnValue({})
      section.edit()
      expect(getAllSpy).toHaveBeenCalled()
    })

    it('should call the promptUserEditJsonInTextEditorSync function with the values from getAll', () => {
      const values = { key1: 'value1', key2: 'value2' }
      jest.spyOn(section, 'getAll').mockReturnValue(values)
      jest.spyOn(section, 'setAll').mockImplementation(() => {})
      section.edit()
      expect(promptUserEditJsonInTextEditorSync as jest.Mock).toHaveBeenCalled()
    })
  })
})

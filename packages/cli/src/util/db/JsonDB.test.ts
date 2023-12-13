import { JsonDB } from './JsonDB'
import { readJsonFileSafeSync } from '../fs/readJsonFile/readJsonFileSafeSync'
import { writeJsonFileSafe } from '../fs/writeJsonFile/writeJsonFileSafe'

jest.mock('../fs/readJsonFile/readJsonFileSafeSync', () => ({
  ...jest.requireActual('../fs/readJsonFile/readJsonFileSafeSync'),
  readJsonFileSafeSync: jest.fn(),
}))

jest.mock('../fs/writeJsonFile/writeJsonFileSafe', () => ({
  ...jest.requireActual('../fs/writeJsonFile/writeJsonFileSafe'),
  writeJsonFileSafe: jest.fn(),
}))

describe('JsonDB', () => {
  let jsonDB: JsonDB
  const filepath = 'test.json'
  const readJsonFileSafeSyncMock = readJsonFileSafeSync as jest.Mock

  beforeEach(() => {
    jsonDB = new JsonDB(filepath)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {
    it('should initialize data with an empty object if the file does not exist', () => {
      readJsonFileSafeSyncMock.mockReturnValueOnce(null)
      const jsonDB = new JsonDB(filepath)
      expect(jsonDB.get()).toEqual({})
    })

    it('should initialize data with the contents of the file if it exists', () => {
      const data = { key: 'value' }
      readJsonFileSafeSyncMock.mockReturnValueOnce(data)
      const jsonDB = new JsonDB(filepath)
      expect(jsonDB.get()).toEqual(data)
    })
  })

  describe('setFilepath', () => {
    it('should set the filepath property', () => {
      const newFilepath = 'new-test.json'
      jsonDB.setFilepath(newFilepath)
      expect(jsonDB['filepath']).toEqual(newFilepath)
    })

    it('should save the data to the JSON file if save is true', () => {
      const newFilepath = 'new-test.json'
      jsonDB.setFilepath(newFilepath, true)
      expect(writeJsonFileSafe).toHaveBeenCalledWith(newFilepath, jsonDB.get(), { spaces: jsonDB['indents'] })
    })

    it('should not save the data to the JSON file if save is false', () => {
      const newFilepath = 'new-test.json'
      jsonDB.setFilepath(newFilepath, false)
      expect(writeJsonFileSafe).not.toHaveBeenCalled()
    })
  })

  describe('save', () => {
    it('should save the data to the JSON file', async () => {
      await jsonDB.save()
      expect(writeJsonFileSafe).toHaveBeenCalledWith(filepath, jsonDB.get(), { spaces: jsonDB['indents'] })
    })

    it('should save the data to the JSON file with the specified indents', async () => {
      const indents = 2
      await jsonDB.save(indents)
      expect(writeJsonFileSafe).toHaveBeenCalledWith(filepath, jsonDB.get(), { spaces: indents })
    })
  })

  describe('set', () => {
    it('should set the data to the specified value if prefix is not provided', () => {
      const value = { key: 'value' }
      jsonDB.set(undefined, value)
      expect(jsonDB.get()).toEqual(value)
    })

    it('should set the value at the specified prefix', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      expect(jsonDB.get(prefix)).toEqual(value)
    })

    it('should create nested objects if the prefix contains dot-separated keys', () => {
      const prefix = 'key1.key2.key3'
      const value = 'value'
      jsonDB.set(prefix, value)
      expect(jsonDB.get()).toEqual({ key1: { key2: { key3: value } } })
    })

    it('should save the data to the JSON file if save is true', () => {
      const value = { key: 'value' }
      jsonDB.set(undefined, value, true)
      expect(writeJsonFileSafe).toHaveBeenCalledWith(filepath, jsonDB.get(), { spaces: jsonDB['indents'] })
    })

    it('should not save the data to the JSON file if save is false', () => {
      const value = { key: 'value' }
      jsonDB.set(undefined, value, false)
      expect(writeJsonFileSafe).not.toHaveBeenCalled()
    })
  })

  describe('get', () => {
    it('should return the value associated with the key', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      const result = jsonDB.get(prefix)
      expect(result).toEqual(value)
    })

    it('should throw an error if no entry is found at the specified key', () => {
      const prefix = 'key'
      expect(() => jsonDB.get(prefix)).toThrowError(`No entry at '${prefix}'`)
    })

    it('should clone the value before returning it', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      const result = jsonDB.get(prefix)
      expect(result).not.toBe(value)
    })
  })

  describe('getSafe', () => {
    it('should return the value associated with the key', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      const result = jsonDB.getSafe(prefix)
      expect(result).toEqual(value)
    })

    it('should return undefined if no entry is found at the specified key', () => {
      const prefix = 'key'
      const result = jsonDB.getSafe(prefix)
      expect(result).toBeUndefined()
    })

    it('should clone the value before returning it', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      const result = jsonDB.getSafe(prefix)
      expect(result).not.toBe(value)
    })
  })

  describe('has', () => {
    it('should return true if the key exists', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      const result = jsonDB.has(prefix)
      expect(result).toBe(true)
    })

    it('should return false if the key does not exist', () => {
      const prefix = 'key'
      const result = jsonDB.has(prefix)
      expect(result).toBe(false)
    })
  })

  describe('delete', () => {
    it('should delete the data if prefix is not provided', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      jsonDB.delete()
      expect(jsonDB.get()).toEqual({})
    })

    it('should delete the value at the specified prefix', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      jsonDB.delete(prefix)
      expect(jsonDB.getSafe(prefix)).toBeUndefined()
    })

    it('should delete nested objects if the prefix contains dot-separated keys', () => {
      const prefix = 'key1.key2.key3'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      jsonDB.delete(prefix)
      expect(jsonDB.getSafe(prefix)).toBeUndefined()
    })

    it('should save the data to the JSON file if save is true', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value)
      jsonDB.delete(prefix, true)
      expect(writeJsonFileSafe).toHaveBeenCalledWith(filepath, jsonDB.get(), { spaces: jsonDB['indents'] })
    })

    it('should not save the data to the JSON file if save is false', () => {
      const prefix = 'key'
      const value = { key: 'value' }
      jsonDB.set(prefix, value, false)
      jsonDB.delete(prefix, false)
      expect(writeJsonFileSafe).not.toHaveBeenCalled()
    })
  })
})

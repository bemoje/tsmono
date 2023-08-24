import { createObjectFactory } from './createObjectFactory'

describe('createObjectFactory', () => {
  describe('no defaults', () => {
    const noDefaults = createObjectFactory(['a', 'b', 'c'])
    it('no values', () => expect(noDefaults()).toEqual({ a: undefined, b: undefined, c: undefined }))
    it('some values', () => expect(noDefaults([10])).toEqual({ a: 10, b: undefined, c: undefined }))
    it('all values', () => expect(noDefaults([10, 20, 30])).toEqual({ a: 10, b: 20, c: 30 }))
  })

  describe('some defaults', () => {
    const someDefaults = createObjectFactory(['a', 'b', 'c'], [1])
    it('no values', () => expect(someDefaults()).toEqual({ a: 1, b: undefined, c: undefined }))
    it('some values', () => expect(someDefaults([10])).toEqual({ a: 10, b: undefined, c: undefined }))
    it('all values', () => expect(someDefaults([10, 20, 30])).toEqual({ a: 10, b: 20, c: 30 }))
  })

  describe('all defaults', () => {
    const allDefaults = createObjectFactory(['a', 'b', 'c'], [1, 2, 3])
    it('no values', () => expect(allDefaults()).toEqual({ a: 1, b: 2, c: 3 }))
    it('some values', () => expect(allDefaults([10])).toEqual({ a: 10, b: 2, c: 3 }))
    it('all values', () => expect(allDefaults([10, 20, 30])).toEqual({ a: 10, b: 20, c: 30 }))
  })

  describe('Errors', () => {
    it('throws if defaultValues length larger than keys length.', () => {
      expect(() => createObjectFactory(['a'], [1, 2])).toThrowError('defaultValues length larger than keys length.')
    })
    it('throws if values length larger than keys length.', () => {
      expect(() => createObjectFactory(['a'])([1, 2])).toThrowError('values length larger than keys length.')
    })
  })

  it('should create a factory function', () => {
    const factory = createObjectFactory(['key1', 'key2'])
    expect(typeof factory).toBe('function')
  })

  it('should throw an error if defaultValues length is larger than keys length', () => {
    expect(() => createObjectFactory(['key1'], ['value1', 'value2'])).toThrow(
      'defaultValues length larger than keys length.',
    )
  })

  it('should create an object with specified keys and default values', () => {
    const factory = createObjectFactory(['key1', 'key2'], ['value1', 'value2'])
    expect(factory()).toEqual({ key1: 'value1', key2: 'value2' })
  })

  it('should create an object with specified keys and passed values', () => {
    const factory = createObjectFactory(['key1', 'key2'], ['value1', 'value2'])
    expect(factory(['newValue1', 'newValue2'])).toEqual({ key1: 'newValue1', key2: 'newValue2' })
  })

  it('should use default values for undefined values', () => {
    const factory = createObjectFactory(['key1', 'key2'], ['value1', 'value2'])
    expect(factory([undefined as any, 'newValue2'])).toEqual({ key1: 'value1', key2: 'newValue2' })
  })

  it('should throw an error if values length is larger than keys length', () => {
    const factory = createObjectFactory(['key1', 'key2'], ['value1', 'value2'])
    expect(() => factory(['value1', 'value2', 'value3'])).toThrow('values length larger than keys length.')
  })
})

import { objClonePrimitiveProperties } from './objClonePrimitiveProperties'

describe('objClonePrimitiveProperties', () => {
  it('should return an empty object if the input is an empty object', () => {
    const input = {}
    const result = objClonePrimitiveProperties(input)
    expect(result).toEqual({})
  })

  it('should return a shallow clone of the object, replacing non-primitive properties with the string representation of the type', () => {
    const input = {
      prop1: 'value1',
      prop2: 123,
      prop3: true,
      prop4: undefined,
      prop5: null,
      prop6: {
        nestedProp: 'nestedValue',
      },
      prop7: [1, 2, 3],
      prop8: new Date(),
    }
    const result = objClonePrimitiveProperties(input)
    expect(result).not.toBe(input)
    expect(result).toEqual({
      prop1: 'value1',
      prop2: 123,
      prop3: true,
      prop4: undefined,
      prop5: null,
      prop6: '[Object]',
      prop7: '[Array]',
      prop8: '[Date]',
    })
  })
})

import { toJson } from './toJson'

describe('toJson', () => {
  it('Should act exactly like JSON.stringify', () => {
    const data = { name: 'John', age: 30 }
    const expected = JSON.stringify(data)
    expect(toJson(data)).toEqual(expected)
  })

  it('Should indent 2 spaces if pretty print is enabled', () => {
    const data = { name: 'John', age: 30 }
    const expected = JSON.stringify(data, null, 2)
    expect(toJson(data, true)).toEqual(expected)
  })
})

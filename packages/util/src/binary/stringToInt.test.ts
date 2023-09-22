import { stringToInt } from './stringToInt'

describe(stringToInt.name, () => {
  it('should convert the string to an integer using the specified encoding', () => {
    expect(stringToInt('000000049a5f308d', 'hex')).toBe(19769798797)
    expect(stringToInt('AAAABJpfMI0=', 'base64')).toBe(19769798797)
  })
})

import { intToString } from './intToString'

describe(intToString.name, () => {
  it('should convert the integer to a string using the specified encoding', () => {
    expect(intToString(19769798797, 'hex')).toBe('000000049a5f308d')
    expect(intToString(19769798797, 'base64')).toBe('AAAABJpfMI0=')
  })
})

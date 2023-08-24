import { colRowToA1 } from './colRowToA1'

describe('colRowToA1', () => {
  it('example', () => {
    expect(colRowToA1([3, 1])).toStrictEqual('C1')
  })
  it('converts to long col letters', () => {
    expect(colRowToA1([27, 3])).toStrictEqual('AA3')
    expect(colRowToA1([29, 3])).toStrictEqual('AC3')
    expect(colRowToA1([703, 3])).toStrictEqual('AAA3')
  })
  it('converts to long row numbers', () => {
    expect(colRowToA1([1, 33])).toStrictEqual('A33')
    expect(colRowToA1([1, 333])).toStrictEqual('A333')
  })
  it('converts to long row numbers and col numbers simultaneously', () => {
    expect(colRowToA1([27, 33])).toStrictEqual('AA33')
    expect(colRowToA1([703, 333])).toStrictEqual('AAA333')
  })
  it('throws on invalid [col, row]: length not 2', () => {
    expect(() => colRowToA1([1, 1, 1])).toThrowError()
  })
  it('throws on invalid [col, row]: col < 1', () => {
    expect(() => colRowToA1([0, 1])).toThrowError()
  })
  it('throws on invalid [col, row]: row < 1', () => {
    expect(() => colRowToA1([1, 0])).toThrowError()
  })
  it('throws on invalid [col, row]: col not integer', () => {
    expect(() => colRowToA1([1.1, 1])).toThrowError()
  })
  it('throws on invalid [col, row]: col not integer', () => {
    expect(() => colRowToA1([1, 1.1])).toThrowError()
  })
})

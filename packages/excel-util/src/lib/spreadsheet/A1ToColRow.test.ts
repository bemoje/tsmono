import { A1ToColRow } from './A1ToColRow'

describe('A1ToColRow', () => {
  it('accepts simple string', () => {
    expect(A1ToColRow('C1')).toStrictEqual([3, 1])
  })
  it('accepts long col letters', () => {
    expect(A1ToColRow('AA3')).toStrictEqual([27, 3])
    expect(A1ToColRow('AC3')).toStrictEqual([29, 3])
    expect(A1ToColRow('AAA3')).toStrictEqual([703, 3])
  })
  it('accepts long row numbers', () => {
    expect(A1ToColRow('A33')).toStrictEqual([1, 33])
    expect(A1ToColRow('A333')).toStrictEqual([1, 333])
  })
  it('accepts long row numbers and col numbers simultaneously', () => {
    expect(A1ToColRow('AA33')).toStrictEqual([27, 33])
    expect(A1ToColRow('AAA333')).toStrictEqual([703, 333])
  })
  it('works with zero-index', () => {
    expect(A1ToColRow('C1', true)).toStrictEqual([2, 0])
  })
  it('throws on invalid A1 string', () => {
    expect(() => A1ToColRow('')).toThrowError()
    expect(() => A1ToColRow('A')).toThrowError()
    expect(() => A1ToColRow('1')).toThrowError()
    expect(() => A1ToColRow('1A')).toThrowError()
    expect(() => A1ToColRow('1A1')).toThrowError()
    expect(() => A1ToColRow('A1A')).toThrowError()
  })
})

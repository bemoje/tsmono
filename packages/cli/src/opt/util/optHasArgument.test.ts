import { optHasArgument } from './optHasArgument'
import { Option } from 'commander'

describe(optHasArgument.name, () => {
  it('no argument - with short', () => {
    const opt = new Option('-a, --alpha')
    expect(optHasArgument(opt)).toBe(false)
  })
  it('no argument - without short', () => {
    const opt = new Option('--alpha')
    expect(optHasArgument(opt)).toBe(false)
  })
  it('has optional argument - with short', () => {
    const opt = new Option('-a, --alpha [value]')
    expect(optHasArgument(opt)).toBe(true)
  })
  it('has optional argument - without short', () => {
    const opt = new Option('--alpha [value]')
    expect(optHasArgument(opt)).toBe(true)
  })
  it('has required argument - with short', () => {
    const opt = new Option('-a, --alpha <value>')
    expect(optHasArgument(opt)).toBe(true)
  })
  it('has required argument - without short', () => {
    const opt = new Option('--alpha <value>')
    expect(optHasArgument(opt)).toBe(true)
  })
})

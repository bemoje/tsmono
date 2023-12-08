import { getOptionArgumentName } from './getOptionArgumentName'
import { Option } from 'commander'

describe(getOptionArgumentName.name, () => {
  const flags = '--alpha '
  it('required arg', () => {
    const arg = '<arg>'
    expect(getOptionArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('optional arg', () => {
    const arg = '[arg]'
    expect(getOptionArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('required variadic arg', () => {
    const arg = '<arg...>'
    expect(getOptionArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('optional variadic arg', () => {
    const arg = '[arg...]'
    expect(getOptionArgumentName(new Option(flags + arg))).toBe(arg)
  })
  it('no arg', () => {
    expect(getOptionArgumentName(new Option(flags.trim()))).toBe(undefined)
  })
})

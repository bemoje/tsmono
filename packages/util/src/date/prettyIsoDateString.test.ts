import { prettyIsoDateString } from './prettyIsoDateString'

describe(prettyIsoDateString.name, () => {
  const s = '2020-02-03T14:01:04.437Z'

  it('renders expected result with year precision', () => {
    expect(prettyIsoDateString(s, '_', 'year')).toBe('2020')
  })

  it('renders expected result with month precision', () => {
    expect(prettyIsoDateString(s, '_', 'month')).toBe('2020.02')
  })

  it('renders expected result with day precision', () => {
    expect(prettyIsoDateString(s, '_', 'day')).toBe('2020.02.03')
  })

  it('renders expected result with hour precision', () => {
    expect(prettyIsoDateString(s, '_', 'hour')).toBe('2020.02.03_14')
  })

  it('renders expected result with minute precision', () => {
    expect(prettyIsoDateString(s, '_', 'minute')).toBe('2020.02.03_14.01')
  })

  it('renders expected result with second precision', () => {
    expect(prettyIsoDateString(s, '_', 'second')).toBe('2020.02.03_14.01.04')
  })

  it('renders expected result with millisecond precision', () => {
    expect(prettyIsoDateString(s, '_', 'millisecond')).toBe('2020.02.03_14.01.04.437')
  })

  it('renders expected result with different separator', () => {
    expect(prettyIsoDateString(s, '$', 'millisecond')).toBe('2020.02.03$14.01.04.437')
  })
})

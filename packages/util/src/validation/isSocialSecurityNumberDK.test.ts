import { isSocialSecurityNumberDK } from './isSocialSecurityNumberDK'

describe('isSocialSecurityNumberDK', () => {
  it('Correct validates Danish SSN', () => {
    expect(isSocialSecurityNumberDK('201187-1234')).toBe(true)
    expect(isSocialSecurityNumberDK('201187-1234')).toBe(true)
    expect(isSocialSecurityNumberDK('011209-1235')).toBe(true)
    expect(isSocialSecurityNumberDK('011209--1235')).toBe(false)
    expect(isSocialSecurityNumberDK('011209-12350')).toBe(false)
    expect(isSocialSecurityNumberDK('001209-1235')).toBe(false)
    expect(isSocialSecurityNumberDK('321209-1235')).toBe(false)
    expect(isSocialSecurityNumberDK('010009-1235')).toBe(false)
    expect(isSocialSecurityNumberDK('011332-1235')).toBe(false)
  })
})

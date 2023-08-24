import { parseSocialSecurityNumberDK } from './parseSocialSecurityNumberDK'
import { ParsedSocialSecurityNumberDK } from './types/ParsedSocialSecurityNumberDK'

describe('parseSocialSecurityNumberDK', () => {
  it('correctly parses Danish SSN 20th century', () => {
    const parsed = parseSocialSecurityNumberDK('201187-1234') as ParsedSocialSecurityNumberDK
    expect(parsed).toBeDefined()
    expect(parsed.year).toBe(1987)
    expect(parsed.month).toBe(11)
    expect(parsed.day).toBe(20)
    expect(parsed.id).toBe(1234)
    expect(parsed.sex).toBe('F')
  })

  it('correctly parses Danish SSN 21st century', () => {
    const parsed = parseSocialSecurityNumberDK('011209-1235') as ParsedSocialSecurityNumberDK
    expect(parsed).toBeDefined()
    expect(parsed.year).toBe(2009)
    expect(parsed.month).toBe(12)
    expect(parsed.day).toBe(1)
    expect(parsed.id).toBe(1235)
    expect(parsed.sex).toBe('M')
  })

  it('cannot parse invalid format', () => {
    expect(parseSocialSecurityNumberDK('011209--1235')).toBeUndefined()
    expect(parseSocialSecurityNumberDK('011209-12350')).toBeUndefined()
  })

  it('cannot parse invalid birthdate - day', () => {
    expect(parseSocialSecurityNumberDK('001209-1235')).toBeUndefined()
    expect(parseSocialSecurityNumberDK('321209-1235')).toBeUndefined()
  })

  it('cannot parse invalid birthdate - month', () => {
    expect(parseSocialSecurityNumberDK('010009-1235')).toBeUndefined()
    expect(parseSocialSecurityNumberDK('011332-1235')).toBeUndefined()
  })
})

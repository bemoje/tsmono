import { regexMatcherToValidater } from './regexMatcherToValidater'

describe('regexMatcherToValidater', () => {
  it('works', () => {
    const regexMatchDigits = /\d+/g
    const regexIsDigit = regexMatcherToValidater(regexMatchDigits) //=> /^\d$/
    const isDigit = (str: string) => regexIsDigit.test(str)
    expect(isDigit('1')).toBe(true)
    expect(isDigit('a')).toBe(false)
  })
})

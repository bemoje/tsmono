import { formatJson } from './formatJson'

describe(formatJson.name, () => {
  it('parses with 1 indents', () => {
    const json = '{"o1":{"p":2},"o2":[1,2]}'
    const result = formatJson(json, 1)
    const expected = [
      '{',
      ' "o1": {',
      '  "p": 2',
      ' },',
      ' "o2": [1,2]',
      '}',
      //
    ].join('\n')
    expect(expected).toBe(result)
  })

  it('parses with 2 indents (default)', () => {
    const json = '{"o1":{"p":2},"o2":{"p":1,"a":"hi"}}'
    const result = formatJson(json)
    const expected = [
      '{',
      '  "o1": {',
      '    "p": 2',
      '  },',
      '  "o2": {',
      '    "p": 1,',
      '    "a": "hi"',
      '  }',
      '}',
      //
    ].join('\n')
    expect(expected).toBe(result)
  })
})

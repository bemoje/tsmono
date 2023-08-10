import { TsDocTag } from './TsDocTag'

describe(TsDocTag.name, () => {
  describe('constructor', () => {
    it('should set the tag, name, and description properties', () => {
      const tag = 'param'
      const name = 'exampleName'
      const description = ['example description']
      const tsDocTag = new TsDocTag(tag, name, description)
      expect(tsDocTag.tag).toBe(tag)
      expect(tsDocTag.name).toBe(name)
      expect(tsDocTag.description).toEqual(description)
    })

    it('should throw error on incorrectly formatted example tags.', () => {
      expect(() => new TsDocTag('example', '', ['```ts', '```', 'example description', '```'])).toThrow()
    })

    it('should normalize leading and trailing code blocks from description if tag is "example"', () => {
      expect(new TsDocTag('example', '', ['```', 'example description', '```']).description).toEqual([
        '```ts',
        'example description',
        '```',
      ])

      expect(new TsDocTag('example', '', ['```js', 'example description', '```']).description).toEqual([
        '```ts',
        'example description',
        '```',
      ])

      expect(new TsDocTag('example', '', ['example description']).description).toEqual([
        '```ts',
        'example description',
        '```',
      ])
    })

    it('should normalize leading and trailing blank lines from description if tag is "example"', () => {
      const tag = new TsDocTag('example', '', [
        '',
        '```ts',
        'const a = 1',
        'const b = 2',
        '```',
        '',
        //
      ])
      expect(tag.description).toEqual([
        '```ts',
        'const a = 1',
        'const b = 2',
        '```',
        //
      ])
    })

    it('should correctly initialize TsDocTag instance', () => {
      const tag = new TsDocTag('param', 'name', ['description line 1', 'description line 2'])
      expect(tag.tag).toEqual('param')
      expect(tag.name).toEqual('name')
      expect(tag.description).toEqual(['description line 1', 'description line 2'])
    })

    it('should create a TsDocTag instance with the given tag, name, and description', () => {
      const tag = new TsDocTag('param', 'paramName', ['This is a parameter.'])
      expect(tag.tag).toBe('param')
      expect(tag.name).toBe('paramName')
      expect(tag.description).toEqual(['This is a parameter.'])
    })

    it('should normalize known tag names', () => {
      const tag = new TsDocTag('virtual', '', ['This is a virtual method.'])
      expect(tag.tag).toBe('abstract')
    })

    it('should throw an error for invalid tag names', () => {
      expect(() => new TsDocTag('invalidTag')).toThrow()
    })

    it('should throw an error for named tags without a name parameter', () => {
      expect(() => new TsDocTag('param')).toThrow()
    })

    it('should throw an error for named tags with an invalid name parameter', () => {
      expect(() => new TsDocTag('param', '1param')).toThrow()
      expect(() => new TsDocTag('param', 'param!')).toThrow()
    })

    it('should throw an error for unnamed tags without a description', () => {
      expect(() => new TsDocTag('description')).toThrow()
    })

    it('should throw an error for unnamed tags with a name parameter', () => {
      expect(() => new TsDocTag('description', 'name')).toThrow()
    })

    it('should format example tags as markdown ts-code blocks', () => {
      const tag = new TsDocTag('example', '', ['This is an example:', '```', 'console.log("Hello, world!");', '```'])
      expect(tag.description).toEqual(['```ts', 'console.log("Hello, world!");', '```'])
    })

    it('should throw an error for invalid example tags', () => {
      expect(
        () => new TsDocTag('example', '', ['This is an invalid example:', '```', 'console.log("Hello, world!");']),
      ).toThrowError('Invalid example tag: markdown code block not closed.')
    })

    it('should throw an error for named multi tags without a description', () => {
      expect(() => new TsDocTag('param', 'paramName')).toThrowError('Tag @param requires a description.')
    })
  })

  describe('toString', () => {
    it('should render the tag as a TSDoc string', () => {
      const result = new TsDocTag('param', 'paramName', ['This is a parameter.']).toString()
      expect(result).toBe('@param paramName This is a parameter.')
    })

    it('should render the tag without the name parameter if it is not provided', () => {
      const result = new TsDocTag('returns', '', ['an integer.']).toString()
      expect(result).toBe('@returns an integer.')
    })

    it('should render the tag without the tag name if it is "description"', () => {
      const result = new TsDocTag('description', '', ['This is a description.']).toString()
      expect(result).toBe('This is a description.')
    })
  })
})

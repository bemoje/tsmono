import { TsDoc } from './TsDoc'
import { TsDocTag } from './TsDocTag'

describe(TsDoc.name, () => {
  describe('constructor', () => {
    it('should create a TsDoc instance with no code', () => {
      const tsDoc = new TsDoc()
      expect(tsDoc.size).toBe(0)
    })

    it('should create a TsDoc instance with valid code', () => {
      const code = `
        /**
         * This is a description.
         * @param name - The name.
         */
      `.trim()
      const tsDoc = new TsDoc(code)
      expect(tsDoc.size).toBe(2)
      expect(tsDoc.single.get('description')).toBeDefined()
      expect(tsDoc.namedMulti.get('param')?.get('name')).toBeDefined()
    })

    it('should throw Error when trying to create a TsDoc instance with invalid code', () => {
      const code = `
        /**
          This is an invalid TSDoc comment.
         */
      `.trim()
      expect(() => {
        new TsDoc(code)
      }).toThrow()
    })
  })

  describe('single', () => {
    it('should add a single tag', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('description', '', ['an int'])
      tsDoc.addTag(tag)
      expect(tsDoc.single.get('description')).toBe(tag)
    })

    it('should not add a single tag if the tag is not in the tagOrder', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('asdf', '', ['fdsa'])
      tsDoc.addTag(tag)
      expect(tsDoc.single.has('asdf')).toBe(false)
    })

    it('should remove a single tag', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('description', '', ['this is something'])
      tsDoc.addTag(tag)
      tsDoc.removeTags('description')
      expect(tsDoc.single.has('description')).toBe(false)
    })
  })

  describe('multi', () => {
    it('should add a multi tag', () => {
      const tsDoc = new TsDoc()
      const taga = new TsDocTag('throws', '', ['when sad'])
      const tagb = new TsDocTag('throws', '', ['when happy'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      expect(tsDoc.multi.get('throws')).toEqual([taga, tagb])
    })

    it('should not add a multi tag if the tag is not in the tagOrder', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('unknown', '', ['unknown'])
      tsDoc.addTag(tag)
      expect(tsDoc.multi.has('unknown')).toBe(false)
    })

    it('should remove a multi tag', () => {
      const tsDoc = new TsDoc()
      const taga = new TsDocTag('throws', '', ['an error'])
      const tagb = new TsDocTag('throws', '', ['an error'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      expect(tsDoc.multi.has('throws')).toBe(true)
      tsDoc.removeTags('throws')
      expect(tsDoc.multi.has('throws')).toBe(false)
    })
  })

  describe('namedMulti', () => {
    it('should add a named multi tag', () => {
      const tsDoc = new TsDoc()
      const taga = new TsDocTag('param', 'firstName', ['the first name'])
      const tagb = new TsDocTag('param', 'lastName', ['the last name'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      expect(tsDoc.namedMulti.get('param')).toEqual(
        new Map([
          ['firstName', taga],
          ['lastName', tagb],
        ]),
      )
    })

    it('should not add a named multi tag if the tag is not in the tagOrder', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('throws', '', ['an error'])
      tsDoc.addTag(tag)
      expect(tsDoc.namedMulti.has('throws')).toBe(false)
    })

    it('should remove a named multi tag', () => {
      const tsDoc = new TsDoc()
      const taga = new TsDocTag('param', 'firstName', ['the first name'])
      const tagb = new TsDocTag('param', 'lastName', ['the last name'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      tsDoc.removeTags('param', 'firstName')
      expect(tsDoc.namedMulti.get('param')).toEqual(new Map([['lastName', tagb]]))
    })
  })

  describe('addTag', () => {
    it('should add a TsDocTag to the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('description', '', ['This is a description.'])
      tsDoc.addTag(tag)
      expect(tsDoc.size).toBe(1)
      expect(tsDoc.single.get('description')).toBe(tag)
    })

    it('should not add a TsDocTag if the tag is not in the tagOrder', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('invalidTag', '', ['This is an invalid tag.'])
      tsDoc.addTag(tag)
      expect(tsDoc.size).toBe(0)
    })

    it('should add a named multi TsDocTag to the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('param', 'name', ['The name.'])
      tsDoc.addTag(tag)
      expect(tsDoc.size).toBe(1)
      expect(tsDoc.namedMulti.get('param')).toBeDefined()
      expect(tsDoc.namedMulti.get('param')?.get('name')).toBe(tag)
    })

    it('should add a multi TsDocTag to the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('throws', '', ['This is an example.'])
      expect(tsDoc.size).toBe(0)
      tsDoc.addTag(tag)
      expect(tsDoc.size).toBe(1)
      expect(tsDoc.multi.get('throws')).toBeDefined()
      expect(tsDoc.multi.get('throws')?.[0]).toBe(tag)
    })
  })

  describe('removeTags', () => {
    it('should remove a single TsDocTag from the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('description', '', ['This is a description.'])
      tsDoc.addTag(tag)
      tsDoc.removeTags('description')
      expect(tsDoc.size).toBe(0)
    })

    it('should remove a named multi TsDocTag from the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('param', 'name', ['The name.'])
      tsDoc.addTag(tag)
      tsDoc.removeTags('param', 'name')
      expect(tsDoc.size).toBe(0)
    })

    it('should remove all named multi TsDocTags with the provided tag from the TsDoc instance if name is not provided', () => {
      const tsDoc = new TsDoc()
      const taga = new TsDocTag('param', 'name1', ['The name 1.'])
      const tagb = new TsDocTag('param', 'name2', ['The name 2.'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      tsDoc.removeTags('param')
      expect(tsDoc.size).toBe(0)
    })

    it('should remove a multi TsDocTag from the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('example', '', ['This is an example.'])
      tsDoc.addTag(tag)
      tsDoc.removeTags('example')
      expect(tsDoc.size).toBe(0)
    })

    it('should return self when tag is not defined in the tag order.', () => {
      const tsDoc = new TsDoc()
      expect(tsDoc.removeTags('sometag')).toBe(tsDoc)
    })
  })

  describe('size', () => {
    it('should return the correct size', () => {
      const tsDoc = new TsDoc()
      const taga = new TsDocTag('description', '', ['asd'])
      const tagb = new TsDocTag('returns', '', ['asd'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      expect(tsDoc.size).toBe(2)
    })
  })

  describe('isEmpty', () => {
    it('should return true if the TsDoc instance has no tags', () => {
      const tsDoc = new TsDoc()
      expect(tsDoc.isEmpty).toBe(true)
    })

    it('should return false if the TsDoc instance has tags', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('returns', '', ['something'])
      tsDoc.addTag(tag)
      expect(tsDoc.isEmpty).toBe(false)
    })
  })

  describe('clear', () => {
    it('should delete all tags', () => {
      const tsDoc = new TsDoc()
      const taga = new TsDocTag('description', '', ['asd'])
      const tagb = new TsDocTag('returns', '', ['asd'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      expect(tsDoc.size).toBe(2)
      tsDoc.clear()
      expect(tsDoc.size).toBe(0)
    })
  })

  describe('iterateTags', () => {
    it('should iterate over all tags in the order specified by tagOrder', () => {
      const tsDoc = new TsDoc('', { tagOrder: ['tagb', 'taga', 'tagd', 'tagc'] })
      const taga = new TsDocTag('taga', '', ['a'])
      const tagb = new TsDocTag('tagb', '', ['b'])
      const tagc = new TsDocTag('tagc', '', ['c'])
      const tagd = new TsDocTag('tagd', '', ['d'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      tsDoc.addTag(tagc)
      tsDoc.addTag(tagd)
      const tags = Array.from(tsDoc.iterateTags())
      expect(tags).toEqual([tagb, taga, tagd, tagc])
    })

    it('should include empty strings if withSpaces is true', () => {
      const tsDoc = new TsDoc('', { tagOrder: ['taga', '', 'tagb', 'tagc', '', 'tagd'] })
      const taga = new TsDocTag('taga', '', ['a'])
      const tagb = new TsDocTag('tagb', '', ['b'])
      const tagc = new TsDocTag('tagc', '', ['c'])
      const tagd = new TsDocTag('tagd', '', ['d'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      tsDoc.addTag(tagc)
      tsDoc.addTag(tagd)
      const tags = Array.from(tsDoc.iterateTags(true))
      expect(tags).toEqual([taga, '', tagb, tagc, '', tagd])
    })
  })

  describe('clone', () => {
    it('should return a deep clone of the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const tag = new TsDocTag('tag', '', ['tag'])
      tsDoc.addTag(tag)
      const clone = tsDoc.clone()
      expect(clone).not.toBe(tsDoc)
      expect(clone.render()).toBe(tsDoc.render())
    })
  })

  describe('assign', () => {
    it('should merge tags from another TsDoc instance 1', () => {
      const t1 = new TsDoc()
      const tt1 = new TsDocTag('description', '', ['The thing'])
      t1.addTag(tt1)

      const t2 = new TsDoc()
      const tt2 = new TsDocTag('throws', '', ['A thing'])
      t2.addTag(tt2)

      t1.assign(t2)
      expect(t1.size).toBe(2)
      expect(t1.single.get('description')).toBe(tt1)
      expect(t1.multi.get('throws')?.includes(tt2)).toBe(true)
    })

    it('should merge tags from another TsDoc instance 2', () => {
      const tsDoc1 = new TsDoc()
      const taga = new TsDocTag('description', '', ['This is a description.'])
      tsDoc1.addTag(taga)

      const tsDoc2 = new TsDoc()
      const tagb = new TsDocTag('param', 'name', ['The name.'])
      tsDoc2.addTag(tagb)

      tsDoc1.assign(tsDoc2)
      expect(tsDoc1.size).toBe(2)
      expect(tsDoc1.single.get('description')).toBe(taga)
      expect(tsDoc1.namedMulti.get('param')).toBeDefined()
      expect(tsDoc1.namedMulti.get('param')?.get('name')).toBe(tagb)
    })
  })

  describe('reorderParams', () => {
    it('should sort the param tags according to the order specified in the paramOrder property', () => {
      const tsDoc = new TsDoc('', { paramOrder: ['c', 'a', 'b'] })
      const taga = new TsDocTag('param', 'b', ['b'])
      const tagb = new TsDocTag('param', 'a', ['a'])
      const tagc = new TsDocTag('param', 'c', ['c'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      tsDoc.addTag(tagc)
      tsDoc.reorderParams()
      const tags = Array.from(tsDoc.iterateTags())
      expect(tags).toEqual([tagc, tagb, taga])
    })
    it('should return self if there are no params', () => {
      const tsDoc = new TsDoc('', { paramOrder: ['c', 'a', 'b'] })
      expect(tsDoc.reorderParams()).toBe(tsDoc)
    })
  })

  describe('render', () => {
    it('should render a TSDoc block comment string with all tags in the order specified by the tagOrder property', () => {
      const tsDoc = new TsDoc('', { tagOrder: ['tagc', 'taga', 'tagb'] })
      const taga = new TsDocTag('taga', '', ['a'])
      const tagb = new TsDocTag('tagb', '', ['b'])
      const tagc = new TsDocTag('tagc', '', ['c'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      tsDoc.addTag(tagc)
      const rendered = tsDoc.render()
      expect(rendered).toBe('/**\n * @tagc c\n * @taga a\n * @tagb b\n */')
    })
  })

  describe('toString', () => {
    it('Should call the render method and this behave identically.', () => {
      const tsDoc = new TsDoc('', { tagOrder: ['tagc', 'taga', 'tagb'] })
      const taga = new TsDocTag('taga', '', ['a'])
      const tagb = new TsDocTag('tagb', '', ['b'])
      const tagc = new TsDocTag('tagc', '', ['c'])
      tsDoc.addTag(taga)
      tsDoc.addTag(tagb)
      tsDoc.addTag(tagc)
      expect(tsDoc.render()).toBe(tsDoc.toString())
    })
  })

  describe('getTagOrder', () => {
    it('should return the tagOrder property if it is defined', () => {
      const tsDoc = new TsDoc(undefined, { tagOrder: ['taga', 'tagb'] })
      expect(tsDoc.getTagOrder()).toEqual(['taga', 'tagb'])
    })

    it('should return TsDoc.defaultTagOrder if the tagOrder property is not defined', () => {
      const tsDoc = new TsDoc()
      expect(tsDoc.getTagOrder()).toEqual(TsDoc.defaultTagOrder)
    })
  })

  describe('addBlockComment', () => {
    test('should add tags to the TsDoc instance', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * Description of the thing
         * @returns - The greeting message.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(2)
      expect(tsDoc.single.has('description')).toBe(true)
      expect(tsDoc.single.has('returns')).toBe(true)

      const returnsTag = tsDoc.single.get('returns')
      if (!returnsTag) throw new Error('paramTags is undefined')
      expect(returnsTag.tag).toBe('returns')
      expect(returnsTag.name).toBe('')
      expect(returnsTag.description).toEqual(['- The greeting message.'])
    })

    test('should ignore tags that are not in the tagOrder', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * @returns - The greeting message.
         * @unknownTag - Unknown tag.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(1)
      expect(tsDoc.single.has('returns')).toBe(true)
      expect(tsDoc.single.has('unknownTag')).toBe(false)
    })

    test('should add multiple instances of multi tags', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * @param name - The name of the person.
         * @param age - The age of the person.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(2)
      expect(tsDoc.namedMulti.has('param')).toBe(true)

      const paramTags = tsDoc.namedMulti.get('param')
      if (!paramTags) throw new Error('paramTags is undefined')
      expect(paramTags.size).toBe(2)

      const firstParamTag = paramTags.get('name') as TsDocTag
      expect(firstParamTag.tag).toBe('param')
      expect(firstParamTag.name).toBe('name')
      expect(firstParamTag.description).toEqual(['- The name of the person.'])

      const secondParamTag = paramTags.get('age') as TsDocTag
      expect(secondParamTag.tag).toBe('param')
      expect(secondParamTag.name).toBe('age')
      expect(secondParamTag.description).toEqual(['- The age of the person.'])
    })

    test('should add multiple instances of named multi tags', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * @param name - The name of the person.
         * @param age - The age of the person.
         * @param name - The name of the person.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(2)
      expect(tsDoc.namedMulti.has('param')).toBe(true)

      const paramTags = tsDoc.namedMulti.get('param')
      if (!paramTags) throw new Error('paramTags is undefined')
      expect(paramTags.size).toBe(2)

      const firstParamTag = paramTags.get('name')
      expect(firstParamTag?.tag).toBe('param')
      expect(firstParamTag?.name).toBe('name')
      expect(firstParamTag?.description).toEqual(['- The name of the person.'])

      const secondParamTag = paramTags.get('age')
      expect(secondParamTag?.tag).toBe('param')
      expect(secondParamTag?.name).toBe('age')
      expect(secondParamTag?.description).toEqual(['- The age of the person.'])
    })

    test('should ignore tags with missing name parameter', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * @param - The name of the person.
         * @returns - The greeting message.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(1)
      expect(tsDoc.single.has('returns')).toBe(true)
      expect(tsDoc.single.has('param')).toBe(false)
    })

    test('should ignore tags with missing description', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * @param name
         * @returns - The greeting message.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(1)
      expect(tsDoc.single.has('returns')).toBe(true)
      expect(tsDoc.single.has('param')).toBe(false)
    })

    test('should ignore tags with invalid name', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * @param 123name - The name of the person.
         * @returns - The greeting message.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(1)
      expect(tsDoc.single.has('returns')).toBe(true)
      expect(tsDoc.single.has('param')).toBe(false)
    })

    test('should ignore tags with invalid tag name', () => {
      const tsDoc = new TsDoc()
      const code = `
        /**
         * @unknownTag - Unknown tag.
         * @returns - The greeting message.
         */
      `
      tsDoc.addBlockComment(code)

      expect(tsDoc.size).toBe(1)
      expect(tsDoc.single.has('returns')).toBe(true)
      expect(tsDoc.single.has('unknownTag')).toBe(false)
    })
  })
})

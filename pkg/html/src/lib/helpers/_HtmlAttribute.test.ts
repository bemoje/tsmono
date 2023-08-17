import { _HtmlAttribute } from './_HtmlAttribute'

describe(_HtmlAttribute.name, () => {
  describe('name', () => {
    it('should return the name passed in the constructor', () => {
      const attribute = new _HtmlAttribute('class')
      expect(attribute.name).toBe('class')
    })
  })

  describe('value', () => {
    it('should return the value passed in the constructor', () => {
      const attribute = new _HtmlAttribute('class', 'container')
      expect(attribute.value).toBe('container')
    })

    it('should return undefined if no value is passed in the constructor', () => {
      const attribute = new _HtmlAttribute('class')
      expect(attribute.value).toBeUndefined()
    })
  })

  describe('constructor', () => {
    it('should create an instance of _HtmlAttribute with the provided name and value', () => {
      const attribute = new _HtmlAttribute('class', 'container')
      expect(attribute.name).toBe('class')
      expect(attribute.value).toBe('container')
    })

    it('should create an instance of _HtmlAttribute with the provided name and undefined value if no value is passed', () => {
      const attribute = new _HtmlAttribute('class')
      expect(attribute.name).toBe('class')
      expect(attribute.value).toBeUndefined()
    })
  })

  describe('isBoolean', () => {
    it('should return true if the attribute name is in _HTML_BOOLEAN_ATTRIBUTES', () => {
      const attribute = new _HtmlAttribute('checked')
      expect(attribute.isBoolean).toBe(true)
    })

    it('should return false if the attribute name is not in _HTML_BOOLEAN_ATTRIBUTES', () => {
      const attribute = new _HtmlAttribute('class')
      expect(attribute.isBoolean).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return the attribute name if it is a boolean attribute', () => {
      const attribute = new _HtmlAttribute('checked')
      expect(attribute.toString()).toBe('checked')
    })

    it('should return the attribute name and value if it is not a boolean attribute', () => {
      const attribute = new _HtmlAttribute('class', 'container')
      expect(attribute.toString()).toBe('class="container"')
    })

    it('should return the attribute name and empty value if it is not a boolean attribute and no value is provided', () => {
      const attribute = new _HtmlAttribute('class')
      expect(attribute.toString()).toBe('class=""')
    })
  })
})

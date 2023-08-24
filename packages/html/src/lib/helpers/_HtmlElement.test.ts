import { _HtmlAttribute } from './_HtmlAttribute'
import { _HtmlElement } from './_HtmlElement'

describe(_HtmlElement.name, () => {
  describe('tag', () => {
    it('should return the correct tag', () => {
      const element = new _HtmlElement('div')
      expect(element.tag).toBe('div')
    })
  })

  describe('attributes', () => {
    it('should return an empty map if no attributes are set', () => {
      const element = new _HtmlElement('div')
      expect(element.attributes.size).toBe(0)
    })

    it('should return the correct attributes', () => {
      const attribute1 = new _HtmlAttribute('class', 'container')
      const attribute2 = new _HtmlAttribute('id', 'main')
      const element = new _HtmlElement('div', attribute1, attribute2)
      expect(element.attributes.size).toBe(2)
      expect(element.attributes.get('class')).toBe(attribute1)
      expect(element.attributes.get('id')).toBe(attribute2)
    })
  })

  describe('children', () => {
    it('should return an empty array if no children are set', () => {
      const element = new _HtmlElement('div')
      expect(element.children.length).toBe(0)
    })

    it('should return the correct children', () => {
      const child1 = new _HtmlElement('p', 'Hello')
      const child2 = new _HtmlElement('p', 'World')
      const element = new _HtmlElement('div', child1, child2)
      expect(element.children.length).toBe(2)
      expect(element.children[0]).toBe(child1)
      expect(element.children[1]).toBe(child2)
    })
  })

  describe('constructor', () => {
    it('should set the attributes and children correctly', () => {
      const attribute = new _HtmlAttribute('class', 'container')
      const child = new _HtmlElement('p', 'Hello')
      const element = new _HtmlElement('div', attribute, child)
      expect(element.attributes.size).toBe(1)
      expect(element.attributes.get('class')).toBe(attribute)
      expect(element.children.length).toBe(1)
      expect(element.children[0]).toBe(child)
    })

    it('should flatten the arguments array', () => {
      const attribute1 = new _HtmlAttribute('class', 'container')
      const attribute2 = new _HtmlAttribute('id', 'main')
      const child1 = new _HtmlElement('p', 'Hello')
      const child2 = new _HtmlElement('p', 'World')
      const element = new _HtmlElement('div', [attribute1, attribute2], [child1, child2])
      expect(element.attributes.size).toBe(2)
      expect(element.attributes.get('class')).toBe(attribute1)
      expect(element.attributes.get('id')).toBe(attribute2)
      expect(element.children.length).toBe(2)
      expect(element.children[0]).toBe(child1)
      expect(element.children[1]).toBe(child2)
    })

    it('should handle string arguments correctly', () => {
      const element = new _HtmlElement('div', 'Hello', 'World')
      expect(element.children.length).toBe(2)
      expect(element.children[0]).toBe('Hello')
      expect(element.children[1]).toBe('World')
    })

    it('should handle nested _HtmlElement arguments correctly', () => {
      const child1 = new _HtmlElement('p', 'Hello')
      const child2 = new _HtmlElement('p', 'World')
      const element = new _HtmlElement('div', child1, child2)
      expect(element.children.length).toBe(2)
      expect(element.children[0]).toBe(child1)
      expect(element.children[1]).toBe(child2)
    })

    it('should handle nested _HtmlElement array arguments correctly', () => {
      const child1 = new _HtmlElement('p', 'Hello')
      const child2 = new _HtmlElement('p', 'World')
      const element = new _HtmlElement('div', [child1, child2])
      expect(element.children.length).toBe(2)
      expect(element.children[0]).toBe(child1)
      expect(element.children[1]).toBe(child2)
    })
  })

  describe('isVoid', () => {
    it('should return true for void elements', () => {
      const element = new _HtmlElement('img')
      expect(element.isVoid).toBe(true)
    })

    it('should return false for non-void elements', () => {
      const element = new _HtmlElement('div')
      expect(element.isVoid).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return the correct string representation for non-void elements', () => {
      const element = new _HtmlElement('div', new _HtmlAttribute('class', 'container'), 'Hello')
      const str = element.toString()
      expect(str).toBe('<div class="container">Hello</div>')
    })

    it('should return the correct string representation for void elements', () => {
      const element = new _HtmlElement('img', new _HtmlAttribute('src', 'image.jpg'))
      const str = element.toString()
      expect(str).toBe('<img src="image.jpg" />')
    })
  })
})

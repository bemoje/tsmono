import { attr, comment, el, tableFrom } from './html'

describe('html', () => {
  describe('comment', () => {
    it('should render an HTML comment', () => {
      const result = comment('This is a comment')
      expect(result).toBe('<!-- This is a comment -->')
    })
  })

  describe('tableFrom', () => {
    it('should render an HTML table from a 2D array', () => {
      const rows = [
        ['Name', 'Age'],
        ['John', '25'],
        ['Jane', '30'],
      ]
      const result = tableFrom(rows)
      expect(result.toString()).toBe(
        '<table class="table table-striped table-hover table-sm"><thead><tr><th>Name</th><th>Age</th></tr></thead><tbody><tr><td>John</td><td>25</td></tr><tr><td>Jane</td><td>30</td></tr></tbody></table>',
      )
    })

    it('should render an HTML table without headers', () => {
      const rows = [
        ['John', '25'],
        ['Jane', '30'],
      ]
      const result = tableFrom(rows, false)
      expect(result.toString()).toBe(
        '<table class="table table-striped table-hover table-sm"><thead></thead><tbody><tr><td>John</td><td>25</td></tr><tr><td>Jane</td><td>30</td></tr></tbody></table>',
      )
    })
  })

  describe('el', () => {
    it('should create an HTML element', () => {
      const result = el.div('Hello, world!')
      expect(result.toString()).toBe('<div>Hello, world!</div>')
    })
  })

  describe('attr', () => {
    it('should create an HTML attribute', () => {
      const result = attr.class('container')
      expect(result.toString()).toBe('class="container"')
    })
  })
})

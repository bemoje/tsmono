import { _HTML_ATTRIBUTES } from './data/_HTML_ATTRIBUTES'
import { _HTML_ELEMENTS } from './data/_HTML_ELEMENTS'
import { _HtmlAttribute } from './helpers/_HtmlAttribute'
import { _HtmlDocument } from './helpers/_HtmlDocument'
import { _HtmlElement } from './helpers/_HtmlElement'
import { _HtmlElementConstructorArgs } from './types/_HtmlElementConstructorArgs'
import { AttributesMap } from './types/AttributesMap'
import { ElementsMap } from './types/ElementsMap'

/**
 * Module with functions for writing and rendering HTML with javascript syntax.
 * @module html
 */
export { attr, comment, el, tableFrom }

/**
 * Attribute name to _HtmlAttribute instance map.
 * The common HTML attributes are instantiated on module initialization.
 */
const attr: AttributesMap = (() => {
  const attributes: AttributesMap = {}
  for (const name of _HTML_ATTRIBUTES) {
    attributes[name] = (value?: string | number | boolean) => new _HtmlAttribute(name, value)
  }
  return attributes
})()

/**
 * Render an HTML comment.
 */
const comment = <T>(comment: T): string => {
  return '<!-- ' + comment + ' -->'
}

/**
 * Element tag to _HtmlElement instance map.
 * The common HTML tags are instantiated on module initialization.
 */
const el: ElementsMap = (() => {
  const elements: ElementsMap = {}
  for (const tag of _HTML_ELEMENTS) {
    elements[tag] = (...args: _HtmlElementConstructorArgs[]) => new _HtmlElement(tag, ...args)
  }
  elements['html'] = (...args: _HtmlElementConstructorArgs[]) => new _HtmlDocument('html', ...args)
  return elements
})()

/**
 * Render an HTML table element from a 2D array table.
 * @param rows The table's rows
 * @param hasHeaders Whether the first row is a header row
 */
const tableFrom = (rows: string[][], hasHeaders = true): _HtmlElement => {
  const thead = el.thead()
  if (hasHeaders) {
    rows = rows.slice()
    thead.children.push(el.tr((rows.shift() || []).map((cell) => el.th(cell))))
  }
  return el.table(
    attr.class('table table-striped table-hover table-sm'),
    thead,
    el.tbody(rows.map((row) => el.tr(row.map((cell) => el.td(cell))))),
  )
}

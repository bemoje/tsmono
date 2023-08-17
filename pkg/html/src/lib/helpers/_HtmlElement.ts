import { _HTML_VOID_ELEMENTS } from '../data/_HTML_VOID_ELEMENTS'
import { _HtmlElementConstructorArgs } from '../types/_HtmlElementConstructorArgs'
import { _HtmlAttribute } from './_HtmlAttribute'

/**
 * Represents an HTML element.
 * @remarks Can be rendered as real html or converted to a real DOM element.
 */
export class _HtmlElement {
  /**
   * The element's attributes.
   */
  attributes: Map<string, _HtmlAttribute> = new Map()

  /**
   * The element's children.
   */

  children: (_HtmlElement | string)[] = []

  /**
   * Creates an _HtmlElement instance.
   * @param tag The element's tag
   * @param args The element's attributes and children
   */
  constructor(
    public tag: string,
    ...args: _HtmlElementConstructorArgs[]
  ) {
    for (const arg of args.flat()) {
      if (arg instanceof _HtmlAttribute) {
        this.attributes.set(arg.name, arg)
      } else if (typeof arg === 'string' && tag !== 'script' && tag !== 'style') {
        this.children.push(arg.replace(/\r*\n/g, '<br />'))
      } else {
        this.children.push(arg)
      }
    }
    if (this.children.length && this.isVoid) {
      throw new Error('Void elements cannot have children.')
    }
  }

  /**
   * Whether the element is a void element.
   */
  get isVoid(): boolean {
    return _HTML_VOID_ELEMENTS.has(this.tag)
  }

  /**
   * Returns this instance as an actual DOM HTMLElement.
   */
  toHtmlElement(): HTMLElement {
    const elem = document.createElement(this.tag)
    for (const attr of this.attributes.values()) {
      elem.setAttribute(attr.name, attr.value?.toString() || '')
    }
    for (const child of this.children) {
      if (typeof child === 'string') {
        elem.appendChild(document.createTextNode(child))
      } else {
        elem.appendChild(child.toHtmlElement())
      }
    }
    return elem
  }

  /**
   * Render the HTML element as a string.
   */
  toString(): string {
    return `<${this.tag}${this.attributes.size ? ' ' + Array.from(this.attributes.values()).join(' ') : ''}${
      this.isVoid ? ' />' : `>${this.children.join('')}</${this.tag}>`
    }`
  }
}

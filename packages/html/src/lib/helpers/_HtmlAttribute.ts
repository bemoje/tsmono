import { _HTML_BOOLEAN_ATTRIBUTES } from '../data/_HTML_BOOLEAN_ATTRIBUTES'

/**
 * Represents an HTML attribute.
 * @remarks Can be rendered as real html or converted to a real DOM attribute from the _HtmlElement class.
 */
export class _HtmlAttribute {
  /**
   * Creates an _HtmlAttribute instance.
   * @param name The attribute's name
   * @param value The attribute's value
   */
  constructor(
    public name: string,
    public value?: string | number | boolean,
  ) {}

  /**
   * Whether the attribute is a boolean attribute.
   */
  get isBoolean(): boolean {
    return _HTML_BOOLEAN_ATTRIBUTES.has(this.name)
  }

  /**
   * Render the HTML attribute as a string.
   */
  toString(): string {
    return `${this.name}${this.isBoolean ? '' : `="${this.value || ''}"`}`
  }
}

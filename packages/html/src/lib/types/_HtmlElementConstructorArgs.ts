import { _HtmlAttribute } from '../helpers/_HtmlAttribute'
import { _HtmlElement } from '../helpers/_HtmlElement'

/**
 * @see _HtmlElement module
 */
export type _HtmlElementConstructorArgs =
  | _HtmlAttribute[]
  | _HtmlAttribute
  | _HtmlElement
  | _HtmlElement[]
  | string
  | string[]

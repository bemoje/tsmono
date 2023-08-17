import { _HtmlElement } from '../helpers/_HtmlElement'
import { _HtmlElementConstructorArgs } from './_HtmlElementConstructorArgs'

/**
 * @see html module
 */
export type ElementsMap = Record<string, (...args: _HtmlElementConstructorArgs[]) => _HtmlElement>

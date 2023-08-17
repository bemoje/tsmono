import { _HtmlAttribute } from '../helpers/_HtmlAttribute'

/**
 * @see html module
 */
export type AttributesMap = Record<string, (value?: string | number | boolean) => _HtmlAttribute>

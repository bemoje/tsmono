import { isString } from './isString'

export function isStringWithNoSpacesOrDashes(value: unknown) {
  return isString(value) && /^[^\s-]+$/i.test(value)
}

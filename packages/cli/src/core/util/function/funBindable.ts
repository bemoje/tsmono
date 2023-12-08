import { TPlainObject } from '@bemoje/util'

export function funToBindable<T extends TPlainObject, R>(func: TUnbound<T, R>): TBindable<T, R> {
  return function (this: T, ...args: any[]) {
    return func(this, ...args)
  }
}

type TBindable<T extends TPlainObject, R> = (this: T, ...args: any[]) => R
type TUnbound<T extends TPlainObject, R> = (self: T, ...args: any[]) => R

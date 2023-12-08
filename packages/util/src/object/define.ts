import { objAssign } from './objAssign'
import { TPlainObject } from '../types/TPlainObject'

export const define = { getter, setter, value, method }

function getter<T extends TPlainObject, R>(obj: T, key: string, get: TBindable<T, R>, des?: PropertyDescriptor) {
  return defProp(obj, key, { get }, des)
}

function setter<T extends TPlainObject, R>(obj: T, key: string, set: TBindable<T, R>, des?: PropertyDescriptor) {
  return defProp(obj, key, { set }, des)
}

function value<T extends TPlainObject, V>(obj: T, key: string, value: V, des?: PropertyDescriptor) {
  return defProp(obj, key, { value }, des)
}

function method<T extends TPlainObject, R>(obj: T, fn: TBindable<T, R>, des?: PropertyDescriptor) {
  return defProp(obj, fn.name, { value: fn }, des)
}

function defProp<T extends TPlainObject>(obj: T, key: string, desVal: PropertyDescriptor, des?: PropertyDescriptor) {
  return Object.defineProperty(obj, key, objAssign(getDesAndMerge(obj, key, des), desVal))
}

function getDesAndMerge<T extends TPlainObject>(obj: T, key: string, des?: PropertyDescriptor) {
  if (!Object.hasOwn(obj, key)) return des ?? { configurable: true }
  const cur = Object.getOwnPropertyDescriptor(obj, key)
  return cur ? (des ? objAssign(cur, des) : cur) : { configurable: true }
}

type TBindable<T extends TPlainObject, R> = (this: T, ...args: any[]) => R

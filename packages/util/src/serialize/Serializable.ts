import { formatJson } from './formatJson'
import { ISerializable } from './types/ISerializable'
import { safeJsonParse } from './safeJsonParse'
import { safeJsonStringify } from './safeJsonStringify'
import { SERIALIZABLE_CLASSES } from './core/SERIALIZABLE_CLASSES'
import { UUID } from '../binary/UUID'

/**
 * Base class for serializable classes.
 * Features:
 * - All instances are automatically assigned a 128 bit unique identifier.
 * - Automatically registers the class with @see registerClass.
 * - All instances are stored in a static map.
 * - All instances can be serialized and deserialized while handling circular references and special types normally not correctyly stringified: Date, Set, Map, BigInt, Symbol.
 *
 * @example ```ts
 * class Person extends Serializable {
 *   constructor(public name: string, public age: number) {
 *     super()
 *   }
 * }
 *
 * class Boy extends Person {
 *   sex = 'male'
 *   friends: Person[] = []
 *   constructor(name: string, age: number) {
 *     super(name, age)
 *   }
 * }
 *
 * class Girl extends Person {
 *   sex = 'female'
 *   friends: Person[] = []
 *   constructor(name: string, age: number) {
 *     super(name, age)
 *   }
 * }
 *
 * const girl = new Girl('Anna', 12)
 * const boy = new Boy('Peter', 11)
 * girl.friends.push(boy)
 * boy.friends.push(girl)
 *
 * console.log('----------------------------')
 * console.log(girl)
 * console.log(boy)
 * console.log('----------------------------')
 * const jsonGirls = Girl.serializeInstances(2)
 * console.log(jsonGirls)
 * const jsonBoys = Boy.serializeInstances(2)
 * console.log(jsonBoys)
 * console.log('----------------------------')
 * // serialize both classes' instances together so object references are restored
 * Serializable.deserializeInstances(jsonGirls, jsonBoys)
 * console.dir(Girl.instances, { depth: null })
 * console.dir(Boy.instances, { depth: null })
 * console.log('----------------------------')
 * ```
 */
export abstract class Serializable implements ISerializable {
  /**
   * Returns an object map of all instances of the class.
   */
  static get instances(): Record<string, Serializable> {
    if (!INSTANCES[this.name]) INSTANCES[this.name] = {}
    return INSTANCES[this.name]
  }

  /**
   * Returns the number of instances of the class.
   */
  static countInstances(): number {
    return Object.keys(this.instances).length
  }

  /**
   * Returns the instance with the given id.
   */
  static getInstance(id: string): Serializable | undefined {
    return this.instances[id]
  }

  /**
   * Deserializes JSON string(s) and instantiate objects as class instances.
   * If you need to deserialize instances from multiple classes at once, just pass them all to this method and all cross-class object references are handles.
   * The json strings must have been produced by using @see Serialized.serializeInstances
   * @param jsons - One or more json strings to deserialize.
   */
  static deserializeInstances(...jsons: string[]): void {
    const types: Set<string> = new Set()
    const mixedInstances = jsons.map((json) => JSON.parse(json)).flat()
    for (const instance of mixedInstances) {
      types.add(instance.type)
      const ctor = SERIALIZABLE_CLASSES[instance.type]
      ctor.instances[instance.id] = Object.setPrototypeOf(instance, ctor.prototype)
    }
    for (const className of types) {
      const instances = Object.values(SERIALIZABLE_CLASSES[className].instances) as Serializable[]
      for (const instance of instances) {
        for (const [key, value] of Object.entries(instance)) {
          Reflect.set(instance, key, safeJsonParse(JSON.stringify(value)))
        }
      }
    }
  }

  /**
   * Revives an instance from a plain object.
   * @param serialized - A plain object or json string to revive.
   */
  static revive(serialized: ISerializable | string): Serializable {
    const o = typeof serialized === 'string' ? safeJsonParse(serialized) : serialized
    return (this.instances[o.id] = this.instances[o.id] || Object.setPrototypeOf(o, this.prototype))
  }

  /**
   * Serializes all instances of the class.
   * @param indent - The number of spaces to use for indentation.
   */
  static serializeInstances(indent?: number): string {
    const json =
      '[' +
      Object.values(this.instances)
        .map((ins) => ins.serialize())
        .join(',') +
      ']'
    if (!indent) return json
    return formatJson(json, indent)
  }

  /**
   * Delete all instances.
   */
  static clearInstances(): void {
    INSTANCES[this.name] = {}
  }

  /**
   * Delete all instances while ensuring each instance property on each is deleted.
   */
  static destroyInstances(): void {
    Object.values(this.instances).forEach((instance) => {
      if (instance.destroy) instance.destroy()
    })
    this.clearInstances()
  }

  /**
   * Returns true if an instance with the given id exists.
   * @param id - The id of the instance.
   */
  static hasInstance(id: string): boolean {
    return Reflect.has(this.instances, id)
  }

  /**
   * Delete all instances.
   * @param id - The id of the instance.
   */
  static deleteInstance(id: string): void {
    if (this.hasInstance(id)) {
      Reflect.deleteProperty(this.instances, id)
    }
  }

  /**
   * The name of the class of the instance.
   */
  readonly type: string

  /**
   * The 128 bit unique identifier of the instance.
   * The first 32 bits are a timestamp encoded as 'base64url'.
   */
  readonly id: string

  /**
   * Creates a new instance.
   */
  constructor() {
    this.type = this.constructor.name
    this.id = UUID(128, 'base64url')
    this.initializeClass()
    this.class.instances[this.id] = this
  }

  /**
   * Returns the prototype of the instance.
   */
  get proto() {
    return Object.getPrototypeOf(this)
  }

  /**
   * Returns the class constructor.
   */
  get class() {
    return Object.getPrototypeOf(this).constructor
  }

  /**
   * Delete all properties of the instance.
   */
  destroy(): void {
    for (const key of Object.getOwnPropertyNames(this)) {
      if (Reflect.has(this, key)) {
        Reflect.deleteProperty(this, key)
      }
    }
  }

  /**
   * Serializes the instance.
   * @param indent - The number of spaces to use for indentation.
   */
  serialize(indent?: number): string {
    return safeJsonStringify(this.class.instances[this.id], indent)
  }

  /**
   * Initializes the class of the instance.
   */
  private initializeClass() {
    if (!INITIALIZED.get(this.class)) {
      INITIALIZED.set(this.class, true)
      INSTANCES[this.type] = {}
      const ctor = this.proto.constructor
      if (SERIALIZABLE_CLASSES[ctor.name]) {
        throw new Error('A different class is already registered with the name: ' + ctor.name)
      }
      SERIALIZABLE_CLASSES[ctor.name] = ctor
    }
  }
}

/**
 * A map that stores all instances of all Serializable subclasses.
 */
const INSTANCES: Record<string, Record<string, Serializable>> = {}

/**
 * A map that tracks whether a subclass has been initialized.
 */
const INITIALIZED: Map<unknown, boolean> = new Map()

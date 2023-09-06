import { arrShallowEquals, mapGetOrElse } from '@bemoje/util'
import { TsDocTag } from './TsDocTag'
import { TsDocOptions } from './types/TsDocOptions'
import { isMultiTsDocTag } from './util/isMultiTsDocTag'
import { isNamedMultiTsDocTag } from './util/isNamedMultiTsDocTag'
import { isNamedTsDocTag } from './util/isNamedTsDocTag'
import { tsDocNormalizeTagName } from './util/tsDocNormalizeTagName'
import { tsDocStripTypesAndDefaults } from './util/tsDocStripTypesAndDefaults'
import { tsDocUnwrapComment } from './util/tsDocUnwrapComment'
import { tsDocWrapAsComment } from './util/tsDocWrapAsComment'

/**
 * A class representing a TSDoc block comment.
 */
export class TsDoc {
  /**
   * The default order in which tags are rendered in the TSDoc comment.
   */
  static defaultTagOrder = [
    'description',
    'remarks',
    'typeParam',
    'template',
    'param',
    'returns',
    'yields',
    'emits',
    'throws',
    'method',
    'example',
  ]

  /**
   * The order in which tags are rendered in the TSDoc comment.
   * Empty strings means spacing between tags when iterating and rendering.
   */
  protected tagOrder?: string[]

  /**
   * Can be used to specify the order in which param-tags are rendered in the TSDoc comment.
   */
  protected paramOrder?: Set<string>

  /**
   * Single tags are tags that can only appear once in a TSDoc comment.
   */
  readonly single: Map<string, TsDocTag> = new Map()

  /**
   * Multi tags are tags that can appear multiple times in a TSDoc comment, but each instance must have unique description text.
   */
  readonly multi: Map<string, TsDocTag[]> = new Map()

  /**
   * Named multi tags are tags that can appear multiple times in a TSDoc comment, but each instance must have a unique name.
   */
  readonly namedMulti: Map<string, Map<string, TsDocTag>> = new Map()

  /**
   * Creates a new TSDoc comment.
   * @param code The TSDoc block comment soruce code.
   * @param options Options for the TSDoc instance.
   * @throws If the provided code is not a valid TSDoc block comment.
   */
  constructor(code?: string, options?: TsDocOptions) {
    if (options) {
      if (options.tagOrder) this.tagOrder = Array.from(options.tagOrder)
      if (options.paramOrder) this.paramOrder = new Set(options.paramOrder)
    }
    if (code) this.addBlockComment(code)
  }

  /**
   * Parses a TSDoc block comment and adds the tags to the TsDoc instance.
   * @param code The TSDoc block comment soruce code.
   */
  addBlockComment(code: string): this {
    code = tsDocStripTypesAndDefaults(code)
    code = tsDocUnwrapComment(code)
    if (!code.startsWith('@')) code = 'description ' + code
    const tags = code.split(/^@/gm)
    for (const str of tags) {
      const description = str.trimEnd().split(/\r?\n/)
      const words = description[0].split(' ')
      const tag = words.shift()
      if (!tag) continue
      if (!this.getTagOrder().includes(tag)) continue
      const isNamed = isNamedTsDocTag(tag)
      const name = isNamed ? words.shift() : ''
      if (isNamed && !name) continue
      description[0] = words.join(' ').trim()
      let instance
      try {
        instance = new TsDocTag(tag, name, description)
      } catch (error) {
        continue
      }
      this.addTag(instance)
    }
    return this
  }

  /**
   * The number of tags in the TsDoc instance.
   */
  get size(): number {
    let size = this.single.size
    for (const map of this.namedMulti.values()) size += map.size
    for (const arr of this.multi.values()) size += arr.length
    return size
  }

  /**
   * Returns whether the TsDoc instance has no tags.
   */
  get isEmpty(): boolean {
    return this.size === 0
  }

  /**
   * Deletes all tags.
   * The tagOrder and paramOrder properties are not affected.
   */
  clear(): this {
    this.single.clear()
    this.multi.clear()
    this.namedMulti.clear()
    return this
  }

  /**
   * Adds a TsDocTag to the TsDoc instance.
   * @param tsDocTag The TsDocTag to add.
   */
  addTag(tsDocTag: TsDocTag): this {
    tsDocTag.tag = tsDocNormalizeTagName(tsDocTag.tag)
    const { tag, name, description } = tsDocTag
    if (!this.getTagOrder().includes(tag)) return this
    if (isNamedMultiTsDocTag(tag)) {
      const map = mapGetOrElse(this.namedMulti, tag, () => new Map())
      if (!map.has(name)) map.set(name, tsDocTag)
    } else if (isMultiTsDocTag(tag)) {
      const arr = mapGetOrElse(this.multi, tag, () => [])
      const index = arr.findIndex((t) => arrShallowEquals(t.description, description))
      if (index === -1) arr.push(tsDocTag)
      else arr[index] = tsDocTag
    } else {
      if (!this.single.has(tag)) this.single.set(tag, tsDocTag)
    }
    return this
  }

  /**
   * Deletes one or all TsDocTag matching the provided tag.
   * If name is not provided, all tags matching the provided tag are deleted.
   * @param tag The tag to remove.
   * @param name The name of the tag to remove.
   */
  removeTags(tag: string, name?: string): this {
    tag = tsDocNormalizeTagName(tag)
    if (!this.getTagOrder().includes(tag)) return this
    if (isNamedMultiTsDocTag(tag)) {
      if (name !== undefined) this.namedMulti.get(tag)?.delete(name)
      else this.namedMulti.delete(tag)
    } else if (isMultiTsDocTag(tag)) {
      this.multi.delete(tag)
    } else {
      this.single.delete(tag)
    }
    return this
  }

  /**
   * Iterate tags in the order specified in the ´tagOrder´ and ´paramOrder´ properties.
   * @param withSpaces Whether to yield empty strings encountered in ´tagOrder´. Empty strings are used to add spacing between tags.
   */
  *iterateTags(withSpaces?: boolean): Generator<TsDocTag | ''> {
    this.reorderParams()
    for (const tag of this.getTagOrder()) {
      if (withSpaces && tag === '') yield tag
      if (isNamedMultiTsDocTag(tag)) {
        const map = this.namedMulti.get(tag)
        if (map) for (const o of map.values()) yield o
      } else if (isMultiTsDocTag(tag)) {
        const arr = this.multi.get(tag)
        if (arr) for (const o of arr) yield o
      } else {
        const o = this.single.get(tag)
        if (o) yield o
      }
    }
  }

  /**
   * Returns a deep clone of this instance.
   */
  clone(): TsDoc {
    return new TsDoc(this.render())
  }

  /**
   * Merge tags from another TsDoc instance.
   */
  assign(tsdoc: TsDoc): this {
    for (const tag of tsdoc.iterateTags()) {
      if (tag) this.addTag(tag)
    }
    return this
  }

  /**
   * Sort the param tags according to the order specified in the paramOrder property.
   */
  reorderParams(): this {
    if (!this.paramOrder) return this
    const curMap = this.namedMulti.get('param')
    if (!curMap) return this
    const newMap = new Map<string, TsDocTag>()
    for (const param of this.paramOrder) {
      const tag = curMap.get(param)
      if (tag) newMap.set(param, tag)
    }
    this.namedMulti.set('param', newMap)
    return this
  }

  /**
   * Renders a TSDoc block comment string with all tags in the order specified by the tagOrder property.
   */
  render(): string {
    return tsDocWrapAsComment([...this.iterateTags(true)].join('\n'))
  }

  /**
   * Renders a TSDoc block comment string with all tags in the order specified by the tagOrder property.
   * @remarks Identical to the `render` method.
   */
  toString(): string {
    return this.render()
  }

  /**
   * Returns the order in which tags are rendered in the TSDoc comment.
   * If no tagOrder was specified in the constructor options, TsDoc.defaultTagOrder is used.
   */
  getTagOrder(): string[] {
    return this.tagOrder || TsDoc.defaultTagOrder
  }
}

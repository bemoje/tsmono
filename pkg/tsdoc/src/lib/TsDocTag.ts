import { arrFindIndicesOf } from '@bemoje/node-util'
import { isNamedMultiTsDocTag } from './util/isNamedMultiTsDocTag'
import { isNamedTsDocTag } from './util/isNamedTsDocTag'
import { tsDocNormalizeTagName } from './util/tsDocNormalizeTagName'

/**
 * A tag belonging to a TSDoc.
 * This does not follow the official TSDoc spec. It is a simplified version.
 */
export class TsDocTag {
  /**
   * The kind of tag.
   */
  public tag: string

  /**
   * The tag's name parameter.
   */
  public name: string

  /**
   * The tag's description.
   */
  public description: string[]

  /**
   * @param tag The kind of tag. Rules:
   * - May only consist of letters a-z.
   * - Certain tags are normalized to other synonymous tags.
   * - Custom tag names are allowed as long as they follow the above rules.
   * @param name The tag's name parameter. Rules:
   * - Only used for named tags.
   * - Must start with a letter.
   * - May only contain word characters and ".".
   * @param description The tag's description. Rules:
   * - Unnamed tags must have a description.
   * - Example tags are formatted as markdown ts-code blocks.
   * - Leading dash in the first line is normalized (removed).
   * @throws on named tag missing name.
   * @throws on unnamed tag missing description.
   * @throws on unnamed tag trying to set name.
   * @throws on invalid tag name.
   * @throws on invalid name.
   * @throws on invalid markdown code block for example tag.
   */
  constructor(tag: string, name = '', description: string[] = []) {
    // tag
    tag = tsDocNormalizeTagName(tag)
    if (!/^[a-z]+$/i.test(tag)) throw new Error('Invalid tag name: ' + tag)
    this.tag = tag

    // name
    if (isNamedMultiTsDocTag(tag)) {
      if (!description.join('').trim()) throw new Error('Tag @' + tag + ' requires a description.')
    }
    if (isNamedTsDocTag(tag)) {
      if (!name) throw new Error('Tag @' + tag + ' requires a name parameter.')
      if (!/^[a-z]/i.test(name)) throw new Error('Name must start with char a-z: ' + name)
      if (!/^[\w.]+$/i.test(name)) throw new Error('Name may contain word chars and ".": ' + name)
    } else {
      if (name) throw new Error('Tag @' + tag + ' does not support a name parameter.')
      if (!description.join('').trim()) throw new Error('Tag @' + tag + ' requires a description.')
    }
    this.name = name

    // description
    if (this.tag === 'example') {
      description = description
        .join('\n')
        .trim()
        .replace(/^ ?- ?/, ' ')
        .split('\n')
      const indicies = arrFindIndicesOf(description, (s) => s.includes('```'))
      if (indicies.length === 2) {
        const first = indicies[0]
        const last = indicies[1]
        description = description.slice(first + 1, last)
      } else if (indicies.length !== 0) {
        throw new Error('Invalid example tag: markdown code block not closed.')
      }
      description = ['```ts', ...description, '```']
    }
    this.description = description
  }

  /**
   * Renders the tag as a TSDoc string.
   * @remarks Ensures that example tags are formatted as markdown ts-code blocks.
   */
  toString(): string {
    let result = this.tag === 'description' ? '' : '@' + this.tag
    if (this.name) result += ' ' + this.name
    result = result.trim()
    if (this.description.length) {
      result += ' ' + this.description.join('\n')
      result = result.trim()
    }
    return result
  }
}

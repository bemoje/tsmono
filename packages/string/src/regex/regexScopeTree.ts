import { compareArray } from '@bemoje/sort'
import { strRemoveDuplicateChars } from '../string/strRemoveDuplicateChars'
import { regexEscapeString } from './regexEscapeString'
import { rexec } from './rexec'
import { RegexScopeTreeNode } from './types/RegexScopeTreeNode'
import type { RexecYield } from './types/RexecYield'

/**
 * Builds a regex that matches a string between two strings. Supports regex instead of string.
 * @param left string or regex to match before
 * @param right string or regex to match after
 * @returns A generator function that takes a string and an optional boolean parameter.
 * The generator function yields nodes of type IRegexScopeTreeNode.
 * @throws If a match does not recognize itself as neither left nor right.
 * @example ```ts
 * const generator = regexScopeTree('(', ')')
 * const iterable = generator('(1+((3)+(1)))+(15+(21-(521))))', true)
 * console.dir([...iterable], { depth: null })
 * ```
 */
export function regexScopeTree(
  left: string | RegExp,
  right: string | RegExp,
): (string: string, yieldOnlyRootNodes?: boolean) => Generator<RegexScopeTreeNode> {
  function parseParam(param: string | RegExp): [RegExp, RegExp] {
    const isString = typeof param === 'string'
    const reg = isString
      ? new RegExp(regexEscapeString(param), 'g')
      : new RegExp(param.source, strRemoveDuplicateChars(param.flags + 'g'))
    const regValidate = new RegExp('^' + reg.source + '$', '')
    return [reg, regValidate]
  }
  const [regLeft, regLeftValidate] = parseParam(left)
  const [regRight, regRightValidate] = parseParam(right)
  return function* (string: string, yieldOnlyRootNodes = false): Generator<RegexScopeTreeNode> {
    const matches = [...rexec(regLeft, string)].concat([...rexec(regRight, string)])
    matches.sort(compareArray((a, b) => a.index - b.index))
    const nodes: RegexScopeTreeNode[] = []
    const stack: RexecYield[] = []
    for (const match of matches) {
      if (regLeftValidate.test(match.match)) {
        stack.push(match)
      } else if (regRightValidate.test(match.match)) {
        const left = stack.pop() as RexecYield
        const right = match
        const depth = stack.length
        const node: RegexScopeTreeNode = {
          parent: null,
          depth,
          left,
          right,
          between: {
            index: left.lastIndex,
            lastIndex: right.index,
            groups: {},
            match: string.substring(left.lastIndex, right.index),
          },
          children: [],
        }
        Object.defineProperty(node, 'parent', { enumerable: false })
        for (let i = nodes.length - 1; i >= 0; i--) {
          if (left.index >= nodes[i].left.index || right.lastIndex <= nodes[i].right.lastIndex) break
          node.children.push(nodes[i])
          if (nodes[i].parent !== null) continue
          nodes[i].parent = node
        }
        nodes.push(node)
        if (yieldOnlyRootNodes && depth > 0) continue
        yield node
      }
    }
  }
}

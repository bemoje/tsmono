import { RexecYield } from './RexecYield'

export type RegexScopeTreeNode = {
  parent: RegexScopeTreeNode | null
  depth: number
  left: RexecYield
  right: RexecYield
  between: RexecYield
  children: RegexScopeTreeNode[]
}

import { strRemoveEmptyLines } from '@bemoje/util'

export function tsJestEnsureLineSpacing(code: string): string {
  return strRemoveEmptyLines(code)
    .split('\n')
    .map((line) => (/^(describe|it|test)\(/.test(line.trimStart()) ? '\n' + line : line))
    .join('\n')
}

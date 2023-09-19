import { colors } from '@bemoje/util'

export function printSearchKeys(normalized: Set<string>): void {
  console.log('\nNormalized search keys: ' + [...normalized].map((s) => colors.green(s)).join(', '))
}

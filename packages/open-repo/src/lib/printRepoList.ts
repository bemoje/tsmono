import { colors } from '@bemoje/util'

export function printRepoList(dirnames: string[]): void {
  console.log(
    dirnames.reduce((acc, dirname, i) => {
      return acc + '\n' + colors.magenta(String(i)) + '.' + dirname
    }, '')
  )
}

import { execute } from '@bemoje/util'

export function test(names?: string[], options: { coverage?: boolean } = {}) {
  execute(
    'nx run-many -t test' + (names ? ' -p ' + names.join(',') : '') + (options.coverage ? ' --codeCoverage=true' : ''),
    { noEcho: true }
  )
}

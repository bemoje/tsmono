import { execute } from '@bemoje/util'
import { deleteTmpDir } from './deleteTmpDir'

export function build(names?: string[]) {
  execute('nx run-many -t "lint,test,build"' + (names ? ' -p ' + names.join(',') : ''))
  deleteTmpDir()
}

import { execute } from '@bemoje/util'

export function openCoverage() {
  execute('start coverage/lcov-report/index.html')
}

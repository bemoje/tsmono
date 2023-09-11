import { executeBatchScript } from '@bemoje/util'

export function openCoverage() {
  executeBatchScript(['start coverage/lcov-report/index.html"'])
}

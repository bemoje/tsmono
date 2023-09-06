export class Timer {
  t0: number
  constructor() {
    this.t0 = Date.now()
  }
  stop(): number {
    return Date.now() - this.t0
  }
}

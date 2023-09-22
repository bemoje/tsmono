export class Timer {
  t0: number
  constructor(public title = 'Elapsed') {
    this.t0 = Date.now()
  }
  stop(): number {
    return Date.now() - this.t0
  }
  toString(): string {
    return this.title + ': ' + this.stop() + ' ms'
  }
  print(): void {
    console.log(this.toString())
  }
}

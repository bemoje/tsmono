import { MonitoredFunction } from './MonitoredFunction'
import { monitorPrototypeMethod } from './monitorPrototypeMethod'
import { monitorStaticMethod } from './monitorStaticMethod'

function example() {
  // monitor functions
  const add = new MonitoredFunction(function add(a: number, b: number): number {
    return a + b
  })

  // monitor class methods
  class Person {
    static className(): string {
      return Person.name
    }
    constructor(public name: string) {}
    getName(): string {
      return this.name
    }
  }

  const getName = monitorPrototypeMethod(Person, 'getName')
  const className = monitorStaticMethod(Person, 'className')

  // set event listeners
  for (const mon of [add, getName, className]) {
    const fun = mon
    mon.events.on('call', (data) => console.log({ event: 'call', fun, ...data }))
    mon.events.on('return', (data) => console.log({ event: 'return', fun, ...data }))
    mon.events.on('error', (data) => console.log({ event: 'error', fun, ...data }))
  }

  // call the functions and see terminal output
  console.log('---------------')
  console.log(MonitoredFunction)
  console.log('---------------')
  console.log('6 + 5 = ' + add(6, 5))
  console.log('---------------')
  console.log('This is the ', Person.className(), ' class!')
  console.log('---------------')
  console.log('The person name is ' + new Person('Bob').getName())
}

example()

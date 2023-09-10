import { Serializable } from './Serializable'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function example() {
  class Person extends Serializable {
    constructor(public name: string, public age: number) {
      super()
    }
  }

  class Boy extends Person {
    sex = 'male'
    friends: Person[] = []
    constructor(name: string, age: number) {
      super(name, age)
    }
  }

  class Girl extends Person {
    sex = 'female'
    friends: Person[] = []
    constructor(name: string, age: number) {
      super(name, age)
    }
  }

  const girl = new Girl('Anna', 12)
  const boy = new Boy('Peter', 11)
  girl.friends.push(boy)
  boy.friends.push(girl)

  console.log('----------------------------')
  console.log(girl)
  console.log(boy)
  console.log('----------------------------')
  const jsonGirls = Girl.serializeInstances(2)
  console.log(jsonGirls)
  const jsonBoys = Boy.serializeInstances(2)
  console.log(jsonBoys)
  console.log('----------------------------')
  // serialize both classes' instances together so object references are restored
  Serializable.deserializeInstances(jsonGirls, jsonBoys)
  console.dir(Girl.instances, { depth: null })
  console.dir(Boy.instances, { depth: null })
  console.log('----------------------------')
}

import { Serializable } from './Serializable'

describe(Serializable.name, () => {
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

  const teardown = () => {
    Person.destroyInstances()
    Boy.destroyInstances()
    Girl.destroyInstances()
  }

  describe('static get instances()', () => {
    beforeEach(teardown)

    it('returns the instances map', () => {
      expect(Object.keys(Girl.instances).length).toBe(0)
      new Girl('Signe', 1)
      expect(Object.keys(Girl.instances).length).toBe(1)
    })

    it('returns unique instance maps for each subclass', () => {
      expect(Girl.instances).not.toBe(Boy.instances)
    })
  })

  describe('static getInstance()', () => {
    beforeEach(teardown)

    it('returns correct instance', () => {
      new Girl('Signe', 1)
      const g1 = new Girl('Anna', 12)
      expect(Girl.getInstance(g1.id)).toBe(g1)
    })
  })

  describe('static countInstances()', () => {
    beforeEach(teardown)

    it('returns the number of instances', () => {
      expect(Girl.countInstances()).toBe(0)
      new Girl('Signe', 1)
      expect(Girl.countInstances()).toBe(1)
    })
  })

  describe('static revive()', () => {
    beforeEach(teardown)

    it('revives from json string', () => {
      const g1 = new Girl('Anna', 12)
      const json = g1.serialize()
      Girl.revive(json)
    })

    it('revives from parsed json string', () => {
      const g1 = new Girl('Anna', 12)
      const json = g1.serialize()
      Girl.revive(JSON.parse(json))
    })
  })

  describe('static serializeInstances()', () => {
    beforeEach(teardown)

    it('serializes all instances', () => {
      new Girl('Anna', 12)
      new Girl('Liz', 13)
      const json = Girl.serializeInstances()
      expect(typeof json).toBe('string')
    })

    it('serializes all instances with indents', () => {
      new Girl('Anna', 12)
      const json = Girl.serializeInstances(1)
      expect(typeof json).toBe('string')
    })

    it('serializes all instances when there are circular references', () => {
      const g1 = new Girl('Anna', 12)
      const g2 = new Girl('Liz', 13)
      g1.friends.push(g2)
      g2.friends.push(g1)
      const json = Girl.serializeInstances()
      expect(typeof json).toBe('string')
    })
  })

  describe('static deserializeInstances()', () => {
    beforeEach(teardown)

    it('deserializes all instances', () => {
      const g1 = new Girl('Anna', 12)
      const g2 = new Girl('Liz', 13)
      const json = Girl.serializeInstances()
      // should be same objects
      expect(Girl.instances[g1.id]).toBe(g1)
      expect(Girl.instances[g1.id]).toBe(g1)
      // remove g1 og g2 from instances map
      Girl.clearInstances()
      expect(Girl.instances[g1.id]).toBeUndefined()
      expect(Girl.instances[g2.id]).toBeUndefined()
      // deserialize and reinstantiate
      Girl.deserializeInstances(json)
      expect(Girl.instances[g1.id]).not.toBeUndefined()
      expect(Girl.instances[g2.id]).not.toBeUndefined()
      // should be different objects
      expect(Girl.instances[g1.id]).not.toBe(g1)
      expect(Girl.instances[g1.id]).not.toBe(g1)
    })

    it('deserializes and restores object references with circular reference cycles', () => {
      // create instances from different classes
      const g1 = new Girl('Anna', 12)
      const g2 = new Girl('Liz', 13)
      // create circular references across instances from different classes
      g1.friends.push(g2)
      g2.friends.push(g1)
      // create json string
      const json = Girl.serializeInstances()
      // wipe instances map (simulate loading instances from database or similar)
      Girl.clearInstances()
      // deserialize all instances from all classes simultanouesly
      Girl.deserializeInstances(json)
      // instances after deserialization
      const dg1 = Girl.getInstance(g1.id) as Girl
      const dg2 = Girl.getInstance(g2.id) as Girl
      expect(dg1).toBeDefined()
      expect(dg2).toBeDefined()
      // verify that object references are restored
      expect(dg1.friends[0]).toBe(dg2)
      expect(dg2.friends[0]).toBe(dg1)
    })

    it('deserializes and restores object references with circular reference cycles across multiple instances', () => {
      // create instances from different classes
      const g = new Girl('Anna', 12)
      const b = new Boy('John', 13)
      // create circular references across instances from different classes
      g.friends.push(b)
      b.friends.push(g)
      // create json strings
      const gjson = Girl.serializeInstances()
      const bjson = Boy.serializeInstances()
      // wipe instances map (simulate loading instances from database or similar)
      Girl.clearInstances()
      Boy.clearInstances()
      // deserialize all instances from all classes simultanouesly
      Person.deserializeInstances(gjson, bjson)
      const dg = Girl.getInstance(g.id) as Girl
      const db = Boy.getInstance(b.id) as Boy
      expect(dg).toBeDefined()
      expect(db).toBeDefined()
      // verify that object references are restored
      expect(dg.friends[0]).toBe(db)
      expect(db.friends[0]).toBe(dg)
    })
  })

  describe('static clearInstances()', () => {
    beforeEach(teardown)

    it('clears instances', () => {
      new Girl('Anna', 12)
      expect(Girl.countInstances()).toBe(1)
      Girl.clearInstances()
      expect(Girl.countInstances()).toBe(0)
    })
  })

  describe('static destroyInstances()', () => {
    beforeEach(teardown)

    it('removes properties from instances', () => {
      const g1 = new Girl('Anna', 12)
      expect(g1.name).toBe('Anna')
      Girl.destroyInstances()
      expect(g1.name).not.toBe('Anna')
    })

    it('clears instances', () => {
      new Girl('Anna', 12)
      expect(Girl.countInstances()).toBe(1)
      Girl.clearInstances()
      expect(Girl.countInstances()).toBe(0)
    })
  })

  describe('static hasInstance()', () => {
    beforeEach(teardown)

    it('returns true if exists and otherwise false', () => {
      const g1 = new Girl('Anna', 12)
      const id = g1.id
      expect(Girl.hasInstance(id)).toBe(true)
      Girl.deleteInstance(id)
      expect(Girl.hasInstance(id)).toBe(false)
    })
  })

  describe('static deleteInstance()', () => {
    beforeEach(teardown)

    it('deletes an instance', () => {
      const g1 = new Girl('Anna', 12)
      expect(Girl.countInstances()).toBe(1)
      Girl.deleteInstance(g1.id)
      expect(Girl.countInstances()).toBe(0)
    })
  })

  describe('constructor()', () => {
    beforeEach(teardown)

    it('new instances have unique IDs', () => {
      const g1 = new Girl('Anna', 12)
      const g2 = new Girl('Liz', 13)
      expect(g1.id).not.toBe(g2.id)
    })

    it('new instances get a correct type identifier (name of class constructor)', () => {
      const g1 = new Girl('Anna', 12)
      const b1 = new Boy('Mark', 13)
      expect(g1.type).toBe('Girl')
      expect(b1.type).toBe('Boy')
    })

    it('adds new instances to the instance Map', () => {
      const g1 = new Girl('Anna', 12)
      expect(Girl.instances[g1.id]).toBe(g1)
    })

    it('should not allow two classes with the same name', () => {
      expect(() => {
        new Girl('Anna', 12)
        new (class Girl extends Person {
          constructor(name: string, age: number) {
            super(name, age)
          }
        })('Nicole', 2)
      }).toThrowError()
    })
  })

  describe('get proto()', () => {
    beforeEach(teardown)

    it('returns the prototype of the instance', () => {
      const g1 = new Girl('Anna', 12)
      expect(g1.proto).toBe(Girl.prototype)
    })
  })

  describe('get class()', () => {
    beforeEach(teardown)

    it('returns the classw constructor of the instance', () => {
      const g1 = new Girl('Anna', 12)
      expect(g1.class).toBe(Girl)
    })
  })

  describe('destroy()', () => {
    beforeEach(teardown)

    it('deletes all the properties of the instance', () => {
      const g1 = new Girl('Anna', 12)
      expect(Girl.instances[g1.id]).not.toBeUndefined()
      expect(g1).not.toBeUndefined()
      expect(g1.id).not.toBeUndefined()
      expect(g1.name).not.toBeUndefined()
      g1.destroy()
      expect(Girl.instances[g1.id]).toBeUndefined()
      expect(g1).not.toBeUndefined()
      expect(g1.id).toBeUndefined()
      expect(g1.name).toBeUndefined()
    })
  })

  describe('serialize()', () => {
    beforeEach(teardown)

    it('serializes the instance', () => {
      const g1 = new Girl('Anna', 12)
      expect(typeof g1.serialize()).toBe('string')
    })
  })
})

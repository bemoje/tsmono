import { tsGetClassMemberAccessModifiers } from './tsGetClassMemberAccessModifiers'

describe(tsGetClassMemberAccessModifiers.name, () => {
  it('should return an empty object if code has no class members', () => {
    const code = `
      class MyClass {}
    `
    const result = tsGetClassMemberAccessModifiers(code)
    expect(result).toEqual({})
  })

  it('should return the correct access modifiers for class members', () => {
    const code = `
      class MyClass {
        private privateProp: number;
        protected protectedMethod(): void {}
        private static staticPrivateMethod(): void {}
        protected static staticProtectedMethod(): void {}
        protected abstract abstractProtectedMethod(): void;
      }
    `
    const result = tsGetClassMemberAccessModifiers(code)
    expect(result).toEqual({
      privateProp: 'private',
      protectedMethod: 'protected',
      staticPrivateMethod: 'private',
      staticProtectedMethod: 'protected',
      abstractProtectedMethod: 'protected',
    })
  })

  it('should return only protected and private class members', () => {
    const code = `
      class MyClass {
        public publicProp: string;
        private privateProp: number;
        protected protectedMethod(): void {}
        public static staticPublicMethod(): void {}
        private static staticPrivateMethod(): void {}
        protected static staticProtectedMethod(): void {}
      }
    `
    const result = tsGetClassMemberAccessModifiers(code)
    expect(result).toEqual({
      privateProp: 'private',
      protectedMethod: 'protected',
      staticPrivateMethod: 'private',
      staticProtectedMethod: 'protected',
    })
  })
})

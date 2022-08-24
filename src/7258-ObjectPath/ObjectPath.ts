
// 两种规则 针对数组先不去管

// 如果数组下不是对象的话，不需要返回多种key  要实现路径对接？

// type GetKey<T , Path = ''> = T extends any[] ? 


// type ArrayRule<T extends any[] , fatherPath = ''> = T extends [infer F , ...infer Rest] ? F extends object ?  never : never :never

// type fatherRule<father extends string , KPath extends string> = father extends '' ? `${KPath}` : `${father}.${KPath}`

// type getPath<T , >

// 为什么不能判断 是个obj 一旦变成{} , 也不知道什么原因 ，为什么脱离{[K:string]:T[K]} 判断T[K] 是否extends object 会有影响
// 所以还是需要一个数组泛型去存储 ， 可问题是这样存进去的key 会不会缺少？

// T[K] extends object ? ObjectKeyPaths<T[K],`${Path}123${'12'}`> : T[K]

type ObjectKeyPaths<T extends object> = {
  [P in keyof T]:T[P] extends object ? ObjectKeyPaths<T[P]> : 1
}
type B = ObjectKeyPaths<{
    count: number,
    person: {
      name: string,
    },
  }>

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectExtends } from '../../utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, 'name' | 'age'>>,
  Expect<
  Equal<
  ObjectKeyPaths<{
    refCount: number
    person: { name: string; age: number }
  }>,
  'refCount' | 'person' | 'person.name' | 'person.age'
  >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>, false>>,
]

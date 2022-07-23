type Same<O, O1> = {
    [P in keyof O & keyof O1] : O[P] | O1[P]
}
// 键的重映射 
type Diff<O, O1> ={
  [K in keyof O | keyof O1 as Exclude<K,keyof Same<O,O1>>] : K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

type b = keyof Same<Foo, Bar>
type c =Exclude<Foo,b>
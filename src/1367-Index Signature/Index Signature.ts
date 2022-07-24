type RemoveIndexSignature<T> ={
    [P in keyof T as string extends P ? never :  number extends P ? never : symbol extends P ? never : P]:T[P]
}
// 之所以是 string extends P 是因为只有当p是索引签名时 P为string 是return true
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

type C =RemoveIndexSignature<Baz>


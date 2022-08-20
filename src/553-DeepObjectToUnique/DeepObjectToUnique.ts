const symbol = Symbol()
type DeepObjectToUniq<O extends object, Path extends any[] = [O]> = {
  [K in keyof O]: O[K] extends object ? DeepObjectToUniq<O[K], [...Path, K]> : O[K]
} & { [symbol]?: Path }

// 看明白思路了 ， 就是要使值特殊就给它添加一个key 后面的value给的是到这个key的路径

// 想法相似 ， 之前想过 对key进行判断，判断是否唯一，但没有对key 进行存储


/* _____________ Test Cases _____________ */
import type { Equal, IsFalse, IsTrue } from '../../utils'

type Quz = { quz: 4 }

type Foo = { foo: 2; baz: Quz; bar: Quz }
type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } }

type UniqQuz = DeepObjectToUniq<Quz>
type UniqFoo = DeepObjectToUniq<Foo>
type UniqBar = DeepObjectToUniq<Bar>

declare let foo: Foo
declare let uniqFoo: UniqFoo

uniqFoo = foo
foo = uniqFoo

type cases = [
  IsFalse<Equal<UniqQuz, Quz>>,
  IsFalse<Equal<UniqFoo, Foo>>,
  IsTrue<Equal<UniqFoo['foo'], Foo['foo']>>,
  IsTrue<Equal<UniqFoo['bar']['quz'], Foo['bar']['quz']>>,
  IsFalse<Equal<UniqQuz, UniqFoo['baz']>>,
  IsFalse<Equal<UniqFoo['bar'], UniqFoo['baz']>>,
  IsFalse<Equal<UniqBar['baz'], UniqFoo['baz']>>,
  IsTrue<Equal<keyof UniqBar['baz'], keyof UniqFoo['baz']>>,
  IsTrue<Equal<keyof Foo, keyof UniqFoo & string>>,
]


type Test =UniqFoo['bar']['quz']
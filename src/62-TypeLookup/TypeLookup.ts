type MyIncludes<U,T> ={[P in keyof U]:U[P] extends T ? U : U[P]} 
// 做起来还是有点死板。。。,而且根本没想到键入。。。
type LookUp<T extends { type: string; [key: string]: any }, U extends T["type"]> =  T extends T ? U extends T['type'] ? T : never : never


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]


type A = 'a' | 'c'
type C =  {[P in A]:P};
type b =  MyIncludes<Cat,'cat'>
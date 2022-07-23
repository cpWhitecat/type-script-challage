// type newArr<T extends readonly any[]> = T extends [infer A , ...infer B] ? A extends '' | 0 | []  ? [false,...newArr<B>] : keyof A extends never ?
type AnyOf<T extends readonly any[]> = T['length'] extends 0 ? false : T extends [infer A , ...infer B] ? A extends '' | 0 | false | [] ? AnyOf<B> : keyof A extends never ? AnyOf<B> :true :[]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]


type A<T extends any[]> = T['length'] 
type B =[1] extends []? true : false
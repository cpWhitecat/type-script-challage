
type Zip<T extends any[], U extends any[],B = false> =T['length'] extends 0 
    ? []  
    : B extends false 
        ? T extends [infer F , ...infer rest] ? U extends [infer L, ...infer R]  ? R extends [] ?[[F,L],...Zip<rest,R,true>]  : [[F,L],...Zip<rest,R>]: [] : []
        :[]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'
// 题目要求深度为2就行了 不用递归
type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

type B =Zip<[[1, 2]], [3]>
type C = Zip<[1, 2, 3], ['1', '2']>
type F = Zip<[1, 2], [true, false]>

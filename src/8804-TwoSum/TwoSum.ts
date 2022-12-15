type GetArrayValue<T extends number , Array extends any[] = []> =  Array extends {length:T} ? Array : GetArrayValue<T,[...Array,T]>

// type TwoSum<T extends number[], U extends number , init extends any[] = []> = T extends [infer F extends number , ...infer Rest extends number[]] ? TwoSum<Rest,U,[...init,GetArrayValue<F>]> : init['length'] extends U ? true :false

// 题意理解错了。。。

type toEqual<T extends number , value extends number , U extends number[] ,initU extends number[] = U> = 
U extends [infer F extends number, ...infer Rest extends number[]] ? [...GetArrayValue<T>,...GetArrayValue<F>]['length'] extends value ? true : toEqual<T,value,Rest,initU> : TwoSum<initU,value>

export type TwoSum<T extends number[], U extends number> = 
T extends [infer F extends number , ...infer Rest extends number[]] 
? toEqual<F,U,Rest>
: false
// 逻辑抽离

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
]

type Test1 = TwoSum<[2, 7, 11, 15], 9>
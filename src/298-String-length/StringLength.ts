type String<S extends string> = 

    S extends `${infer L}${infer R}` 
        ? [L,...String<R>]
        : []
export type LengthOfString<T extends string> = String<T>['length']


// 用一个arr存起来
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

type C = LengthOfString<'hkjsf'>

type b = '0' extends `${infer A}${infer B}` ? A : false;

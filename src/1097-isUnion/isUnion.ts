

type IsUnion<T , F = T> = ( T extends F ? F extends T ? true : false : never) extends true ? false : true
 // never 本身就是个union类型
//  想法就是 infer B | infer A 可实际却是两个泛型是一样的 ， 类型系统推断的一样   错误想法
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

type D = (string extends number | string 
  ? (string extends number ? true :false) | (string extends string ? true :false) 
  :never) 
| (number extends number | string 
  ? (number extends number ? true :false) | (number extends string ? true :false) 
  :never)
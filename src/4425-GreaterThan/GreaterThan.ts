// 主要逻辑就是通过之前的转换成字符   再通过string length 来做比较 还有写个数组 表示各个数比它本身小的union类型

type numberLess = [
    0,
    1|0,
    2|1|0,
    3|2|1|0,
    4|3|2|1|0,
    5|4|3|2|1|0,
    6|5|4|3|2|1|0,
    7|6|5|4|3|2|1|0,
    8|7|6|5|4|3|2|1|0,
]
import { Equal } from '../../utils'
import type {LengthOfString} from '../298-String-length/StringLength'
// 其实要讨论的情况还是挺多的 有length 超出numberLes下标的情况
/**
 * 首先考虑数字长度进行比较
 * 如何比较 谁大谁小？
 * 但是又怕一个很长的数字会影响到我想法的性能 ， 觉得不用考虑，这种情况感觉以后不可能碰到
 * 
 */

// type GreaterThan<T extends number, U extends number , P extends string = `${T}`> = P extends keyof numberLess ? U extends numberLess[P] ? true :false :false

/**    第一版  把相同的逻辑抽离
 * type SameLength<T extends number | string , U extends number | string> =
 `${T}` extends `${infer TF extends number}${infer TR}` ? (`${U}` extends `${infer UF extends number}${infer UR}` ? (Equal<TF,UF> extends true ? SameLength<`${TR}`,`${UR}`> : UF extends numberLess[TF] ? true : false) : false) :false

type toUnion<T extends string , Cache  extends any[]= []> = T extends `${infer F}${infer next}` ? toUnion<next,[...Cache,F]> : Cache
type GreaterThan<T extends number, U extends number> = LengthOfString<`${T}`> extends LengthOfString<`${U}`> ? SameLength<T,U> : toUnion<`${U}`>['length']  extends numberLess[toUnion<`${T}`>['length']] ? true :false

*/



// 优化一下  比较逻辑使用数组  

type outString<T> = T extends `${infer F}${infer next}` ? F : T

type CreateArray<T extends number , U extends any[] = []> = U extends {length:T} ? U : CreateArray<T,[...U,any]>

export type GreaterThan<T extends number , U extends number > = CreateArray<T> extends [...CreateArray<U>,...infer next] ? next['length'] extends 0 ? false : true : false 

/* _____________ Test Cases _____________ */
import type { Expect } from '../../utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<9,8>,true>>
]
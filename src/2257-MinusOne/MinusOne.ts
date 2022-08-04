// import type {Push} from '../3057-push/push'
// import type {Last} from '../15-LastArray/LastArrayType'
// type MinusOne<T extends number , U extends any[] = [0]> = U['length'] extends T ? (U extends [...infer A , infer B] ? B : never) :  MinusOne<T,Push<U,U['length']>>
// type MinusOne<T extends number> = Push<[T],'1'>
// 感觉肯定使用数组下标的方式
// 去获取最后的下表

// type MinusOne<T extends number> =C<T> extends any[] ?  : never
 /* _____________ 测试用例 _____________ */

//  这种方法可行 到时候再搞个键映射 这问题就解决啦
// type numberMap = {
//   0:9,
//   1:0,
//   2:1,
//   3:2,
//   4:3,
//   5:4,
//   6:5,
//   7:6,
//   8:7,
//   9:8
// }
// type handleZero<Cache extends string> = `${Cache}` extends `${infer rest}${infer Last}` ? Last extends '' ? true :false:false
// type handleNumber<T extends string, Cache extends string=''> = `${T}` extends `${infer F extends keyof numberMap}${infer rest}` ? rest extends ''? numberMap[F]:handleNumber<rest>  :false
//  type MinusOne<T extends number | '',Cache = '' > = `${T}` extends `${infer F extends keyof numberMap}${infer rest extends number | ''}` ? rest extends ''? numberMap[F]: MinusOne<rest,`${Cache}${}`>  :false


type MinusOne<T extends number> = 
// extends number 和反转数字都想到了 但一麻烦就觉得自己的方法不够好 ，结果发现 是自己懒

import type { Equal, Expect } from '../../utils'
// 或许可以是用 Record 来解决
type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
//   空间复杂度太高了。。。溢出了 感觉要做成字符串来处理了 ， 明天再说吧
] 
 
type B = MinusOne<1>
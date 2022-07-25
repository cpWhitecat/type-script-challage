import type {Push} from '../3057-push/push'
import type {Last} from '../15-LastArray/LastArrayType'
type MinusOne<T extends number , U extends any[] = [0]> = U['length'] extends T ? (U extends [...infer A , infer B] ? B : never) :  MinusOne<T,Push<U,U['length']>>
// type MinusOne<T extends number> = Push<[T],'1'>
// 感觉肯定使用数组下标的方式
// 去获取最后的下表

// type MinusOne<T extends number> =C<T> extends any[] ?  : never
 /* _____________ 测试用例 _____________ */
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
 
type B = MinusOne<1000>
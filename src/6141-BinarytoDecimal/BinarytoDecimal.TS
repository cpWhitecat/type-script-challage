import {Reverse} from '../3192-Reverse/Reverse'

type handle<S, end extends any[] = [] , add extends any[] = [2]> =S extends `${infer F}${infer next}` ?  F extends '1' ? handle<`${next}`,[...end,...add] , [...add,...add]> : handle<`${next}`,end , [...add,...add]> : end['length']

// 要么做个加法器 ， 或者通过数组长度来计算就这两种方法
// 数组长度有下限制的 ，如果例子超出了

// 但好像自己添加的超出1000的例子也能被算出来
type stringReverse<S , stringCache  extends string= ''> = S extends `${infer F}${infer next}` ? stringReverse<`${next}`,`${F}${stringCache}`> : stringCache

type BinaryToDecimal<S extends string> = handle<stringReverse<S>>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
  Expect<Equal<BinaryToDecimal<'1111111111'>, 1023>>,
]

type Test1 =BinaryToDecimal<'10'>
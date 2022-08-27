import {Reverse} from '../3192-Reverse/Reverse'

type handle<S> =S extends `${infer F}${infer next}` ?  

// 要么做个加法器 ， 或者通过数组长度来计算就这两种方法

type BinaryToDecimal<S extends string> = any


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../../utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]